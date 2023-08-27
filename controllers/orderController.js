const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const balVidyaModel = require('../models/balVidyaModel');
const eventModel = require('../models/eventModel');
const customerModel = require('../models/customerModel');
const bookingModel = require('../models/bookingModel');
const serviceModel = require('../models/addServiceModel');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const vendorIncomeModel = require('../models/vendorIncomeModel');
const adminIncomeModel = require('../models/adminIncomeModel');
const couponModel = require('../models/couponModel');
const couponLogModel = require('../models/couponLogModel');

var razorpayInstance = new Razorpay({
    key_id: "rzp_test_CjE6dleliI5tcb",
    key_secret: "4XgGfyyMkzYHV8QJdXHcCmBt"
});

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}



module.exports = {
    createOrder : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orderType = req.body.type;
                    if(orderType == 0){
                        if(req.body.codeName != ''){
                            var coupon =  await couponModel.findOne({codeName : req.body.codeName});
                            var couponLog =  await couponLogModel.findOne({userId : user.id, couponId : coupon._id});
                            if(couponLog == null){
                                const product = await productModel.findOne({_id : req.body.id}).select("price").select("title").select('userId').select("quantity");
                                if(product != null && product.quantity > 0){
                                    var amount = product.price * 100 * req.body.quantity;
                                    var title = product.title
                                    productUserId = product.userId
                                    var currency = 'INR'
                                    await razorpayInstance.orders.create({amount, currency}, 
                                    async (error, order)=> {
                                        if(!err){
                                            let orderSave = new orderModel({
                                                userId : user.id,
                                                orderId : order.id,
                                                id : req.body.id,
                                                amount : amount,
                                                title : title,
                                                customerId : req.body.customerId,
                                                quantity : req.body.quantity,
                                                providerId : productUserId,
                                                type : 'product'
                                            })
                                            orderSave.save(async function (errorResp){
                                                if(errorResp) res.status(200).json({success : false, message: 'Something went wrong ' + errorResp.message})
                                                else{
                                                    await customerModel.findOneAndUpdate({_id : req.body.customerId, userId : user.id}, 
                                                        {
                                                            orderId : order.id
                                                        },{
                                                        new: true
                                                    });
                                                    var coupon =  await couponModel.findOne({codeName : req.body.codeName});
                                                    var couponLog =  await couponLogModel.findOne({userId : user.id, couponId : coupon._id});
                                                    if(coupon != null){
                                                        if(coupon.userLimit >= coupon.timesUsed){
                                                            if(couponLog != null){
                                                                couponModel.findOneAndUpdate({codeName : req.body.codeName}, 
                                                                    {$inc : {timesUsed : 1}}, function(errCoupon, response){
                                                                        if(errCoupon){
                                                                            res.status(400).json({success : false,message: 'Please try again'})
                                                                        }
                                                                    });
                                                                    couponLogModel.findOneAndUpdate({userId : user.id, couponId : coupon._id}, 
                                                                        {$inc : {timesUsed : 1}}, function(errorCouponLog, response){
                                                                            if(errorCouponLog){
                                                                                res.status(400).json({success : false,message: 'Please try again'})
                                                                            }
                                                                        });
                                                            }
                                                            else{
                                                                couponModel.findOneAndUpdate({codeName : req.body.codeName}, 
                                                                    {$inc : {timesUsed : 1}}, function(errCoupon, response){
                                                                        if(errCoupon){
                                                                            res.status(400).json({success : false,message: 'Please try again'})
                                                                        }
                                                                    });
                                                                let couponLog = new couponLogModel({
                                                                    userId : user.id,
                                                                    couponId : coupon._id,
                                                                    timeUsed : 1,
                                                                })
                                                                couponLog.save(function(errorLog){
                                                                    if(errorLog) res.status(200).json({success : false ,message: 'Something went wrong '+errorLog.message})
                                                                });
                                                            }
                                                        }
                                                        else{
                                                            res.status(400).json({success : false,message: 'Coupon Limit Reached.'})
                                                        }
                                                    }
                                                    else{
                                                        res.status(400).json({success : false,message: 'No Coupon Found.'})
                                                    }
                                                    res.status(200).json({success : true, message: order})
                                                }
                                            }); 
                                        }
                                        else
                                            res.status(400).json({success : false,message: error.message});
                                        }
                                    )
                                }
                                else res.status(400).json({success : false,message: 'Out of Stock'});
                            }
                            else{
                              res.status(400).json({success : false,message: 'Coupon Already Used'});
                            }
                        }
                        else{
                            const product = await productModel.findOne({_id : req.body.id}).select("price").select("title").select('userId').select("quantity");
                            if(product != null && product.quantity > 0){
                                var amount = product.price * 100 * req.body.quantity;
                                var title = product.title
                                productUserId = product.userId
                                var currency = 'INR'
                                await razorpayInstance.orders.create({amount, currency}, 
                                async (error, order)=> {
                                    if(!err){
                                        let orderSave = new orderModel({
                                            userId : user.id,
                                            orderId : order.id,
                                            id : req.body.id,
                                            amount : amount,
                                            title : title,
                                            customerId : req.body.customerId,
                                            quantity : req.body.quantity,
                                            providerId : productUserId,
                                            type : 'product'
                                        })
                                        orderSave.save(async function (errorResp){
                                            if(errorResp) res.status(200).json({success : false, message: 'Something went wrong ' + errorResp.message})
                                            else{
                                                await customerModel.findOneAndUpdate({_id : req.body.customerId, userId : user.id}, 
                                                    {
                                                        orderId : order.id
                                                    },{
                                                    new: true
                                                });
                                                res.status(200).json({success : true, message: order})
                                            }
                                        }); 
                                    }
                                    else
                                        res.status(400).json({success : false,message: error.message});
                                    }
                                )
                            }
                            else res.status(400).json({success : false,message: 'Out of Stock'});
                        }
                    }
                    else if(orderType == 2){
                        const event = await eventModel.findOne({_id : req.body.id}).select("cost").select('title').select('userId');
                        var amount = event.cost * 100 * req.body.quantity;
                        var title = event.title
                        var currency = 'INR'
                        eventUserId = event.userId
                        await razorpayInstance.orders.create({amount, currency}, 
                        async (error, order)=>{
                            if(!err){
                                let orderSave = new orderModel({
                                    userId : user.id,
                                    orderId : order.id,
                                    id : req.body.id,
                                    amount : amount,
                                    title : title,
                                    customerId : req.body.customerId,
                                    quantity : req.body.quantity,
                                    providerId : eventUserId,
                                    type : 'event'
                                })
                                orderSave.save(async function (errorResp){
                                    if(errorResp) res.status(200).json({success : false, message: 'Something went wrong ' + errorResp.message})
                                    else{
                                        await customerModel.findOneAndUpdate({_id : req.body.customerId, userId : user.id}, 
                                            {
                                                orderId : order.id
                                            },{
                                            new: true
                                        });
                                        res.status(200).json({success : true, message: order})
                                    }
                                }); 
                            }
                            else
                                res.status(400).json({success : false,message: error.message});
                            }
                        )
                    }
                    else if(orderType == 3){
                        const service = await serviceModel.findOne({_id : req.body.id}).select("price").select("services").select('userId');
                        var amount = service.price * 100 * req.body.quantity;
                        var services = service.services
                        var serviceProviderUserId = service.userId
                        var currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        async (error, odr)=>{
                            if(!err){
                                let orderDet = new orderModel({
                                    userId : user.id,
                                    orderId : odr.id,
                                    id : req.body.id,
                                    title : services,
                                    amount : amount,
                                    type : 'service',
                                    providerId : serviceProviderUserId
                                })
                                orderDet.save(function(errorResp){
                                    if(errorResp) res.status(200).json({success : true, message: 'Something went wrong '+errorResp.message})
                                    else res.status(200).json({success : true, message: odr})
                                });
                                
                            }
                            else res.status(400).json({success : false,message: error.message});
                            }
                       )
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    createServiceOrder : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const service = await serviceModel.findOne({_id : req.body.id}).select("price").select("services").select('userId');
                        var amount = service.price * 100 * req.body.quantity;
                        var services = service.services
                        var serviceProviderUserId = service.userId
                        var currency = 'INR'
                        await razorpayInstance.orders.create({amount, currency}, 
                        async (error, odr)=>{
                            if(!err){
                                let orderDet = new orderModel({
                                    userId : user.id,
                                    orderId : odr.id,
                                    id : req.body.id,
                                    title : services,
                                    amount : amount,
                                    type : 'service',
                                    providerId : serviceProviderUserId
                                })
                                orderDet.save();
                                res.status(200).json({success : true, message: odr})
                            }
                            else res.status(400).json({success : false,message: error.message});
                            }
                       )
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    verifyOrder : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let orderId = req.body.orderId;
                    let paymentId = req.body.paymentId;
                    let signature = req.body.signature;
                    let hmac = crypto.createHmac('sha256', '4XgGfyyMkzYHV8QJdXHcCmBt');
                    hmac.update(orderId + "|" + paymentId);
                    const generated_signature = hmac.digest('hex');
                    if (generated_signature === signature) {
                        var orders =  await orderModel.findOneAndUpdate({orderId : orderId, userId : user.id}, 
                            {
                                paymentId : paymentId,
                                paymentStatus : 1
                            },{
                            new: true
                        });
                        var orderDetails =  await orderModel.findOne({orderId : orderId}).select('providerId').select('id').select("amount").select('quantity');
                        var customer =  await customerModel.find({orderId : orderId, userId : user.id});
                        if(req.body.type == 'product'){
                            var product = await productModel.findOne({_id : orders.id}).select('quantity');
                            if(product.quantity >= orderDetails.quantity){
                                productModel.findOneAndUpdate({_id : orders.id }, {$inc : {quantity : -orderDetails.quantity}}, function(err, response){});
                            }
                            else{
                                res.status(400).json({success : false,message: 'Product Out of Stock'})
                            }
                        }
                        if(orderDetails){
                            var IncomeDetails =  await vendorIncomeModel.findOne({providerId : orderDetails.providerId});
                            if(IncomeDetails){
                                vendorIncomeModel.findOneAndUpdate({providerId : orderDetails.providerId}, 
                                    {$inc : {balance : orderDetails.amount * 0.9}}, function(errIncreaseIncome, response){
                                        if(errIncreaseIncome){
                                            res.status(400).json({success : false,message: 'Order Pending...You may contact admin with Order Id for more details'})
                                        }
                                    });
                            }
                            else{
                                var IncomeAdd = new vendorIncomeModel({
                                    providerId : orderDetails.providerId,
                                    id : orderDetails.id,
                                    balance : orderDetails.amount * 0.9
                                })
                                IncomeAdd.save(function(errorAddingIncome){
                                    if(errorAddingIncome) res.status(400).json({success : false, message: 'Something went wrong '+ errorAddingIncome.message})
                                });
                            }
                            var IncomeAdmin = new adminIncomeModel({
                                providerId : orderDetails.providerId,
                                orderId : orderId,
                                id : orderDetails.id,
                                balance : orderDetails.amount * 0.1
                            })
                            IncomeAdmin.save(function(errorAddingIncomeAdmin){
                                if(errorAddingIncomeAdmin) res.status(400).json({success : false, message: 'Something went wrong '+ errorAddingIncomeAdmin.message})
                            });
                        }
                        res.status(200).json({success : true, order: orders, customer : customer})
                    }
                    else{
                        res.status(400).json({success : false,message: 'Transaction Failed'})
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getServiceOrderDetails : function(req, res){
        var serviceDetail,customerDetail,providerDetail,userDetail,productDetail,eventDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var serviceOrder =  await orderModel.find({providerId : user.id}).sort([['_id', -1]]).lean();
                    for(var x = 0; x < serviceOrder.length ; x++){
                        customerDetail =  await customerModel.findOne({_id : serviceOrder[x].customerId});
                        serviceDetail =  await serviceModel.findOne({_id : serviceOrder[x].id});
                        productDetail =  await productModel.findOne({_id : serviceOrder[x].id});
                        eventDetails =  await eventModel.findOne({_id : serviceOrder[x].id});
                        providerDetail =  await userModel.findOne({_id : serviceOrder[x].providerId}).select("name").select("email").select("phone")
                        .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                        .sort([['_id', -1]]);
                        userDetail = await userModel.findOne({_id : serviceOrder[x].userId}).select("name").select("email").select("phone")
                        .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                        .sort([['_id', -1]]);
                        serviceOrder[x].customer = customerDetail;
                        serviceOrder[x].serviceDetail = serviceDetail;
                        serviceOrder[x].providerDetail = providerDetail;
                        serviceOrder[x].eventDetails = eventDetails;
                        serviceOrder[x].userDetail = userDetail;
                        serviceOrder[x].productDetail = productDetail;
                    }
                    res.status(200).json({success : true,message: serviceOrder})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllOrder : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var userDetail;
                    var orders =  await orderModel.find({}).sort([['_id', -1]]);
                    if(orders.length > 0){
                        for(var x = 0; x < orders.length ; x++){
                            userDetail =  await userModel.findOne({_id : orders[x].userId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);
                            orders[x].providerDetail = userDetail;
                        }
                    }
                    res.status(200).json({success : true,message: orders})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteOrder : async function (req, res){
        result = await orderModel.remove();
        res.status(200).json({success : true, message: result})
    },
    myOrders : function(req, res){
        var productDetails,customerDetail,serviceProviderDetail;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders;
                    if(req.body.type == ''){
                        myOrders =  await orderModel.find({userId : user.id}).sort([['_id', -1]]).lean();
                    }
                    else{
                        myOrders =  await orderModel.find({$and : [{type : req.body.type},{userId : user.id}]}).sort([['_id', -1]]).lean();
                    }
                    if(myOrders.length > 0){
                        for(var x = 0; x < myOrders.length ; x++){
                            customerDetail =  await customerModel.findOne({_id : myOrders[x].customerId});
                            productDetails =  await productModel.findOne({_id : myOrders[x].id});
                            serviceProviderDetail =  await userModel.findOne({_id : myOrders[x].providerId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);
                            myOrders[x].customer = customerDetail;
                            myOrders[x].product = productDetails;
                            myOrders[x].providerDetail = serviceProviderDetail;
                        }
                    }
                    res.status(200).json({success : true, message: myOrders})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderDetailById : function(req, res){
        var customerDetail,productDetails,serviceProviderDetail;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.findOne({_id : req.body.id}).lean();
                    if(myOrders != null){
                        customerDetail =  await customerModel.findOne({_id : myOrders.customerId});
                        if(req.body.type == 'product'){
                            productDetails =  await productModel.findOne({_id : myOrders.id});
                        }
                        else if(req.body.type == 'event') {
                            productDetails =  await eventModel.findOne({_id : myOrders.id});
                        }
                        else if(req.body.type == 'service') {
                            productDetails =  await serviceModel.findOne({_id : myOrders.id});
                        }
                        serviceProviderDetail =  await userModel.findOne({_id : myOrders.providerId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);;
                        myOrders.customer = customerDetail;
                        myOrders.product = productDetails;
                        myOrders.providerDetail = serviceProviderDetail;
                    }
                    res.status(200).json({success : true, message: myOrders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    orderPending : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var customer,product;
                    var orders =  await orderModel.find({approved : 0}).lean();
                    if(orders.length > 0){
                        for(var x = 0; x < orders.length ; x++){
                            customer =  await customerModel.findOne({_id : orders[x].customerId});
                            product =  await productModel.findOne({id : orders[x].id});
                            orders[x].customer = customer;
                            orders[x].product = product;
                        }
                    }
                    res.status(200).json({success : true, message: orders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    allOrders : function(req, res){
        
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var cust,prod,serviceProviderDetail,userDetail,orderDetail;
                    if(req.body.type == '' && req.body.id == ''){
                        orderDetail =  await orderModel.find({paymentStatus : 1}).sort([['_id', -1]]).lean(); 
                    }
                    else if(req.body.type == '' && req.body.id != ''){
                        orderDetail =  await orderModel.find({$and : [{paymentStatus : 1},{providerId : req.body.id}]}).sort([['_id', -1]]).lean(); 
                    }
                    else{
                        orderDetail =  await orderModel.find({$and : [{type : req.body.type},{paymentStatus : 1}]}).sort([['_id', -1]]).lean();
                    }
                    if(orderDetail.length > 0){
                        for(var x = 0; x < orderDetail.length ; x++){
                            cust =  await customerModel.findOne({_id : orderDetail[x].customerId});
                            prod =  await productModel.findOne({_id : orderDetail[x].id});
                            serviceProviderDetail =  await userModel.findOne({_id : orderDetail[x].providerId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);
                            userDetail =  await userModel.findOne({_id : orderDetail[x].userId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);
                            orderDetail[x].userDetail = userDetail;
                            orderDetail[x].customer = cust;
                            orderDetail[x].product = prod;
                            orderDetail[x].vendorDetail = serviceProviderDetail;
                        }
                    }
                    res.status(200).json({success : true, message: orderDetail})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    approveOrder : function(req, res){
        var customerDetail,productDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var orders =  await orderModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            approved : req.body.status
                        },{
                        new: true
                    }).lean();
                    if(orders.length > 0){
                        customerDetail =  await customerModel.findOne({_id : orders.customerId});
                        productDetails =  await productModel.findOne({id : orders.id});
                        orders.customer = customerDetail;
                        orders.product = productDetails;
                    }
                    res.status(200).json({success : true, message: orders})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getDetailsCount : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myOrders =  await orderModel.find({userId : user.id}).sort([['_id', -1]]);
                    var service = await serviceModel.find({userId : user.id}).sort([['_id', -1]]);
                    var booking =  await bookingModel.find({userId : user.id}).sort([['_id', -1]]);
                    res.status(200).json({success : true, orders : myOrders.length , service : service.length , booking : booking.length})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserBalance : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var allIncome =  await vendorIncomeModel.find({}).sort([['_id', -1]]).lean();
                    if(allIncome.length > 0) {
                        for (var x = 0 ; x < allIncome.length ; x++){
                            var userDetails = await userModel.findOne({_id : allIncome[x].providerId}).select("_id").select("name").select("email").select("phone")
                            .select("profileImageUrl").select("city").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").lean();
                            allIncome[x].userDetails = userDetails;
                        }
                       
                    }
                    res.status(200).json({success : true,message : allIncome})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAdminBalance : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var allIncome =  await adminIncomeModel.find({}).sort([['_id', -1]]).lean();
                    if(allIncome.length > 0) {
                        for (var x = 0 ; x < allIncome.length ; x++){
                            var userDetails = await userModel.findOne({_id : allIncome[x].providerId}).select("_id").select("name").select("email").select("phone")
                            .select("profileImageUrl").select("city").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").lean();
                            allIncome[x].userDetails = userDetails;
                        }
                       
                    }
                    res.status(200).json({success : true,message : allIncome})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}
