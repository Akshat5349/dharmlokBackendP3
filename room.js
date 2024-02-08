module.exports=class Room{
   constructor(room_id,room_title,room_description,host,worker,callback,socket_id){
    this.room_id=room_id
    this.room_title=room_title
    this.room_description=room_description
    this.host=host
    this.producerSocketId=socket_id
    this.producerTransport
    this.consumers={}
    this.producers=[]
    const mediaCodecs=[
      {
        kind:'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channel: 2
      },{
        kind:'video',
        mimeType:'vide/VP8',
        clockRate:90000,
        parameters:{
          'x-google-start-bitrate':1000,
        }
      }
    ]
    worker.createRouter({mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000
        }
      }
    ]}).then(function (router) {
      this.router = router
      callback(this.router.rtpCapabilities)
    }.bind(this))
  }

  getRTPCapabilities(){
    return this.router.rtpCapabilities
  }

  async createWebRtcTransport(callback, sender,socket_id) {
    try {
      const webRtcTransport_options={
        listenIps:[
          {
            // For local Servers
            // ip: '127.0.0.1' 

            // To stream on aws server
            ip: '0.0.0.0' , announcedIp : '50.19.104.238'
          }
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true
      }
      let transport =await this.router.createWebRtcTransport(webRtcTransport_options)
      transport.on('dtlsstatechange',dtlsState=>{
        if( dtlsState==='closed'){
          transport.close()
        }
      })
      transport.on('close',()=>{
        console.log('transport close')
      })
      callback({
        params: {
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
        }
      })
      if(sender){
        this.producerTransport=transport
      }
      else{
        this.consumers[socket_id]={transport:transport}
        console.log(this.consumers[socket_id])
      }
    } catch (error) {
      console.log(error)
    }
  }
  connectProducer(dtlsParameters){
    this.producerTransport.connect({dtlsParameters})
  }
  connectConsumer(dtlsParameters,socket_id){
    this.consumers[socket_id].transport.connect({dtlsParameters})
    console.log(this.consumers[socket_id])
  }
  async consume({rtpCapabilities},socket_id,callback){
    this.consumers[socket_id]['consumer']=[];
    try {
      if(this.router.canConsume({
        producerId:this.producers[0].id,
        rtpCapabilities,
      })&&this.router.canConsume({
        producerId:this.producers[1].id,
        rtpCapabilities,
      })){
        const videoConsumer=await this.consumers[socket_id].transport.consume({
          producerId:this.producers[0].id,
          rtpCapabilities,
          paused:true,
        })
        const audioConsumer=await this.consumers[socket_id].transport.consume({
          producerId:this.producers[1].id,
          rtpCapabilities,
          paused:true,
        })
        this.consumers[socket_id]['consumer'].push(videoConsumer)
        console.log(this.consumers[socket_id].consumer[0])
        this.consumers[socket_id]['consumer'].push(audioConsumer)
        console.log(this.consumers[socket_id].consumer[1])
        videoConsumer.on('transportclose',()=>{
          console.log('transport close from consumer')
        })
        videoConsumer.on('producerclose',()=>{
          console.log('producer of consumer closed')
          // this.consumers[socket_id].transport.close()
        })
        audioConsumer.on('transportclose',()=>{
          console.log('transport close from consumer')
        })
        audioConsumer.on('producerclose',()=>{
          console.log('producer of consumer closed')
          // this.consumers[socket_id].transport.close()
        })
        const params={
          videoParams:{
            id:videoConsumer.id,
          producerId:this.producers[0].id,
          kind:videoConsumer.kind,
          rtpParameters:videoConsumer.rtpParameters,
          },
          audioParams:{
            id:audioConsumer.id,
          producerId:this.producers[1].id,
          kind:audioConsumer.kind,
          rtpParameters:audioConsumer.rtpParameters,
          }
          
        }
        callback({params})
      }
    } catch (error) {
      console.log(error)
      callback({params:{error:error}})
    }
  }
  async produce({kind,rtpParameters,appData},callback){
    console.log({kind,rtpParameters,appData})
    const newProducer = await this.producerTransport.produce({kind,rtpParameters})
    this.producers.push(newProducer);
    console.log("Producer ID: ",newProducer.id,newProducer.kind)
    newProducer.on('transportclose',()=>{
      producer.close()
    })
    callback({id: newProducer})
  }
}