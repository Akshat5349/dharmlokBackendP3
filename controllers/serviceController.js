const serviceModel = require('../models/addServiceModel');
const serviceCategoryModel = require('../models/serviceCategoryModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');


function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}


module.exports = {
    addService : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let service = new serviceModel({
                        userId : user.id,
                        services : req.body.services,
                        type : req.body.type,
                        name : req.body.name,
                        description : req.body.description,
                        place : req.body.place,
                        price: req.body.price,
                        imageUrl : req.body.imageUrl,
                        city : req.body.city,
                        state : req.body.state
                    })
                    service.save();
                    res.status(200).json({success : true,message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myService : async function(req, res) {
        var service = await serviceModel.find({userId : req.body.id}).sort([['_id', -1]]);
        res.status(200).json({success : true, message : service})
    },
    getAllService : async function(req, res) {
        try{
            var service = [];
            var punditDetailsList = [];
            if(req.body.query == ''){
                if(req.body.city == '' && req.body.state == '' && req.body.type == ''){            
                    service =  await serviceModel.find({services : req.body.category}).sort([['_id', -1]]);
                }
                else if (req.body.state != '' && req.body.city == '' && req.body.type == ''){
                    service =  await serviceModel.find({$and : [{services : req.body.category},{state : req.body.state}]}).sort([['_id', -1]]);
                }
                else if (req.body.state != '' && req.body.city != '' && req.body.type == ''){
                    service =  await serviceModel.find({$and : [{services : req.body.category},{state : req.body.state},{city : req.body.city}]}).sort([['_id', -1]]);
                }
                else if (req.body.type != '' && req.body.state == '' && req.body.city == ''){
                    service =  await serviceModel.find({$and : [{services : req.body.category},{type : req.body.type}]}).sort([['_id', -1]]);
                }
                else if (req.body.type != '' && req.body.state != '' && req.body.city == ''){
                    service =  await serviceModel.find({$and : [{services : req.body.category},{type : req.body.type}
                        ,{state : req.body.state}]}).sort([['_id', -1]]);
                }
                else{
                    service =  await serviceModel.find({$and : [{services : req.body.category},{city : req.body.city},{state : req.body.state},{type : req.body.type}]}).sort([['_id', -1]]);
                }
            }
            else{
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.query, 'i')
                };
                service =  await serviceModel.find(queryString).sort([['_id', -1]]);
            }
            if(service.length > 0){
                for(var x = 0 ; x < service.length ; x ++){
                    var panditDetails = await userModel.findOne({_id : service[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("city").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").lean();
                    panditDetails.serviceType = service[x].services
                    panditDetails.serviceId = service[x]._id;
                    punditDetailsList.push(panditDetails);
                }
            }
            res.status(200).json({success : true,message: punditDetailsList})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getServiceById : async function(req, res) {
        try{
            const service =  await serviceModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: service})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteService : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                serviceModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'EBook Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateService : function(req, res){
        let service;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    service =  await serviceModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            services : req.body.services,
                            type : req.body.type,
                            description : req.body.description,
                            place : req.body.place,
                            price: req.body.price,
                            imageUrl : req.body.imageUrl,
                            city : req.body.city,
                            state : req.body.state,
                            active : req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    updateServiceStatus : function(req, res){
        let service;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    service =  await serviceModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active : req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: service})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    addCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let serviceCat = new serviceCategoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    serviceCat.save();
                    res.status(200).json({success : true,message: serviceCat})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var serviceCat = await serviceCategoryModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: serviceCat})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});

                ///////////////check for already present pooja
                serviceCategoryModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Service Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getServicePandit : async function(req, res){
        var otherPanditLists = []
        var  myPandits = []
        var otherPanditList, myPanditList;
        if(req.body.query == ''){
            if(req.body.state == ''){
                if(req.body.type == '' && req.body.services == ''){
                    myPanditList = await serviceModel.find({city : req.body.location}).sort([['_id', 'desc']]);
                    otherPanditList = await serviceModel.find({city : { $ne : req.body.location}}).sort([['_id', 'desc']]);
                }
                else if(req.body.type == '' && req.body.services != ''){
                    myPanditList = await serviceModel.find({city : req.body.location, services : req.body.services}).sort([['_id', 'desc']]);
                    otherPanditList = await serviceModel.find({$and : [{city : { $ne : req.body.location}},{services : req.body.services}]}).sort([['_id', 'desc']]);
                }
                else if(req.body.type != '' && req.body.services != ''){
                    myPanditList = await serviceModel.find({type : req.body.type,city : req.body.location, services : req.body.services}).sort([['_id', 'desc']]);
                    otherPanditList = await serviceModel.find({$and : [{city : { $ne : req.body.location}},{type : req.body.type}, {services : req.body.services}]}).sort([['_id', 'desc']]);
                }
                else if(req.body.type != '' && req.body.services == ''){
                    myPanditList = await serviceModel.find({type : req.body.type,city : req.body.location}).sort([['_id', 'desc']]);
                    otherPanditList = await serviceModel.find({$and : [{city : { $ne : req.body.location}},{type : req.body.type}]}).sort([['_id', 'desc']]);
                }
            }
            else{
                if(req.body.city == ''){
                    if(req.body.type == '' && req.body.services == ''){
                        myPanditList = await serviceModel.find({state : req.body.state}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({state : { $ne : req.body.state}}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type == '' && req.body.services != ''){
                        myPanditList = await serviceModel.find({state : req.body.state, services : req.body.services}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{services : req.body.services}]}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type != '' && req.body.services != ''){
                        myPanditList = await serviceModel.find({type : req.body.type,state : req.body.state, services : req.body.services}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{type : req.body.type}, {services : req.body.services}]}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type != '' && req.body.services == ''){
                        myPanditList = await serviceModel.find({type : req.body.type,state : req.body.state}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{type : req.body.type}]}).sort([['_id', 'desc']]);
                    }
                }
                else if(req.body.city != '' && req.body.state != ''){
                    if(req.body.type == '' && req.body.services == ''){
                        myPanditList = await serviceModel.find({state : req.body.state, city : req.body.city}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({state : { $ne : req.body.state}}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type == '' && req.body.services != ''){
                        myPanditList = await serviceModel.find({state : req.body.state, services : req.body.services, city : req.body.city}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{services : req.body.services}]}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type != '' && req.body.services != ''){
                        myPanditList = await serviceModel.find({type : req.body.type,state : req.body.state, services : req.body.services, city : req.body.city}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{type : req.body.type}, {services : req.body.services}]}).sort([['_id', 'desc']]);
                    }
                    else if(req.body.type != '' && req.body.services == ''){
                        myPanditList = await serviceModel.find({type : req.body.type,state : req.body.state, city : req.body.city}).sort([['_id', 'desc']]);
                        otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{type : req.body.type}]}).sort([['_id', 'desc']]);
                    }
                }
            }
        }
        else{
           if(req.body.type == '' && req.body.state == ''){
                myPanditList = await serviceModel.find({city : req.body.location,name: new RegExp(req.body.query, 'i')}).sort([['_id', 'desc']]);
                otherPanditList = await serviceModel.find({$and : [{city : { $ne : req.body.location}},{name: new RegExp(req.body.query, 'i')}]}).sort([['_id', 'desc']]);
           }
           else if(req.body.type != '' && req.body.state == ''){
                myPanditList = await serviceModel.find({city : req.body.location,name: new RegExp(req.body.query, 'i'), type: req.body.type}).sort([['_id', 'desc']]);
                otherPanditList = await serviceModel.find({$and : [{city : { $ne : req.body.location}},{name: new RegExp(req.body.query, 'i')},{type: req.body.type}]}).sort([['_id', 'desc']]);
           }
           else if(req.body.type == '' && req.body.state != ''){
            myPanditList = await serviceModel.find({name: new RegExp(req.body.query, 'i'), state: req.body.state}).sort([['_id', 'desc']]);
            otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{name: new RegExp(req.body.query, 'i')}]}).sort([['_id', 'desc']]);
            }
            else if(req.body.type != '' && req.body.state != ''){
                myPanditList = await serviceModel.find({name: new RegExp(req.body.query, 'i'), state: req.body.state, type: req.body.type}).sort([['_id', 'desc']]);
                otherPanditList = await serviceModel.find({$and : [{state : { $ne : req.body.state}},{name: new RegExp(req.body.query, 'i')},{type: req.body.type}]}).sort([['_id', 'desc']]);
            }
        }
        if(myPanditList.length > 0){
            for(var x = 0 ; x < myPanditList.length ; x ++){
                var panditDetails = await userModel.findOne({_id : myPanditList[x].userId}).select("name").select("email").select("phone")
                .select("profileImageUrl").select("city").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").lean();
                var serviceDetails = await serviceModel.findOne({_id : myPanditList[x]._id});
                panditDetails.serviceType = myPanditList[x].services
                panditDetails.serviceId = myPanditList[x]._id;
                panditDetails.serviceDetails = serviceDetails;
                myPandits.push(panditDetails);
            }
        }
        if(otherPanditList.length > 0){
            for(var x = 0 ; x < otherPanditList.length ; x ++){
                var panditDetails = await userModel.findOne({_id : otherPanditList[x].userId}).select("name").select("email").select("phone")
                .select("profileImageUrl").select("city").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").lean();
                panditDetails.serviceType = otherPanditList[x].services
                var serviceDetails = await serviceModel.findOne({_id : otherPanditList[x]._id});
                panditDetails.serviceId = otherPanditList[x]._id;
                panditDetails.serviceDetails = serviceDetails;
                otherPanditLists.push(panditDetails);
            }
        }
        var other = getUniqueListBy(otherPanditLists, 'name');
        var my = getUniqueListBy(myPandits, 'name');
        res.status(200).json({success : true,myList: my, otherlist : other})
    },
}