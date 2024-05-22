require('dotenv').config();
const mediasoup = require('mediasoup');
const express = require('express');
const mongoose = require('mongoose');
const Room=require('./room')
var cors = require('cors')
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('connection done');
})
const app = express();
const socket=require('socket.io')
app.use(express.json());



app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
  

app.use(cors(corsOptions));


app.all('/api',function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.setTimeout(20000);
   next();
});


const routes = require('./routes/routes');
const { IdentityStore } = require('aws-sdk');

app.use('/api', routes);

app.use('/view',express.static('./uploads'))

const server=app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
const io=socket(server,{
    cors: {
        origin: "http://localhost:4300",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})
let roomList = {};
const stream=io.of('/api/stream')
const createWorker=async ()=>{
    worker = await mediasoup.createWorker({
        rtcMinPort:2000,
        rtcMaxPort:2020
    })
    console.log(`worker pid ${worker.pid}`)
    worker.on('died',error=>{
        console.error('mediasoup worker has died')
        setTimeout(()=>process.exit(1),2000)
    })
    return worker;
}
let worker=createWorker()
io.on('connection',socket=>{
    console.log('user connected with socket id:'+socket.id);
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        if(roomList[socket.room_id]){
            if(roomList[socket.room_id]?.producerSocketId==socket.id){
                socket.to(socket.room_id).emit('updateStreamState',false)
                console.log("Producer Disconnected...")
                roomList[socket.room_id].producerTransport.close()
                delete roomList[socket.room_id]
            }
            else{
                console.log("Consumer Disconnected...")
                console.log((roomList[socket.room_id].consumers).size)
                delete roomList[socket.room_id].consumers[socket.id]
            }
        }

    })
    socket.on('disconnect-producer',()=>{
        io.to(socket.room_id).emit('updateStreamState',false)
            if(roomList[socket.room_id]?.producerSocketId==socket.id){
                console.log("Producer Disconnected...")
                roomList[socket.room_id].producerTransport.close()
                delete roomList[socket.room_id]
                console.log(roomList)
            }
    })
    socket.on('createRoom',async (data,callback)=>{
        console.log("create Room Invoked");
        if(!roomList[data.room_id]){
            roomList[data.room_id] = new Room(data.room_id,data.title,data.description,data.user,worker,callback,socket.id)
            console.log(roomList)
            socket.room_id = data.room_id;
            socket.join(data.room_id);
            console.log("Socket Rooms",socket.rooms)
            io.to(data.room_id).emit('updateStreamState',true)
        }
    })
    socket.on('join',(id,callback)=>{
        console.log(`User is trying to join the room with id : ${id}`)
        console.log(`Room with id : ${roomList[id]}`)
        socket.room_id=id
        socket.join(id);
        callback(roomList[id]?true:false)
    })
    socket.on('checkStreamState',(id,callback)=>{
        if(roomList[id]){
        console.log(roomList[id])
        callback({isLive:(roomList[id]?true:false),user:(roomList[id]['host']),title:roomList[id]['room_title']})
    }
    })
    socket.on('joinStream',(id,callback)=>{
            socket.room_id=id
            socket.join(id);
            callback(roomList[socket.room_id]?.getRTPCapabilities())
    })

    socket.on('getRTPCapabilities',(callback)=>{
        console.log(roomList[socket.room_id]?.getRTPCapabilities())
        callback(roomList[socket.room_id]?.getRTPCapabilities())
    })
    socket.on('createWebRtcTransport',({sender},callback)=>{
        console.log(callback)
        roomList[socket.room_id]?.createWebRtcTransport(callback,sender,socket.id)
    })
    socket.on('transport-connectProducer',async ({dtlsParameters})=>{
        roomList[socket.room_id]?.connectProducer(dtlsParameters)
    })
    socket.on('transport-connectReciever',async ({dtlsParameters})=>{
        roomList[socket.room_id]?.connectConsumer(dtlsParameters,socket.id)
    })
    socket.on('transport-produce',async (params,callback)=>{
        roomList[socket.room_id]?.produce(params,callback)
    })
    socket.on('consume',async (params,callback)=>{
        roomList[socket.room_id]?.consume(params,socket.id,callback)
    })
    socket.on('consumer-resume',async () =>{
        await roomList[socket.room_id].consumers[socket.id].consumer[0].resume()
        await roomList[socket.room_id].consumers[socket.id].consumer[1].resume()
        console.log('consumer resume')
    })
}) 