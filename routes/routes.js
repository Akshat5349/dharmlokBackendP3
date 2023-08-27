const jwt = require("jsonwebtoken");
const express = require('express');
const multer = require("multer");
const serviceController = require('../controllers/serviceController');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const eventController = require('../controllers/eventController');
const balVidyaController = require('../controllers/balVidyaController');
const balVidyaSubscriptionController = require('../controllers/balVidyaSubscriptionController');
const dharshanController = require('../controllers/dharshanController');
const orderController = require('../controllers/orderController');
const templeController = require('../controllers/templeController');
const eBookController = require('../controllers/ebookController');
const path = require('path');
const sharp = require("sharp");
const fs = require("fs");
const ebookController = require("../controllers/ebookController");
const customerController = require("../controllers/customerController");
const dharamshalaController = require("../controllers/dharamshalaController");
const adController = require("../controllers/adController");
const bookingController = require("../controllers/bookingController");
const audioController = require("../controllers/audioController");
const homeController = require("../controllers/homeController");
const searchAllController = require("../controllers/searchController");
const cartController = require("../controllers/cartController");
const balanceController = require("../controllers/balanceController");
const enquireController = require("../controllers/enquireController");
const bookMarkController = require("../controllers/bookmarkController");
const couponController = require("../controllers/couponController");
const contactController = require("../controllers/contactUsController");
const AWS = require('aws-sdk');
var multerS3 = require('multer-s3');
const s3 = new AWS.S3({
	accessKeyId: "AKIAYAR76KDVKEKVQ277",
	secretAccessKey: "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",
	region : "us-east-1"
});


const router = express.Router();

module.exports = router;

var storage1 = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null,'./uploads')
	},
	filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
	}
});

const upload1 = multer({
	storage: storage1,
}) 

const app = express();

app.use(express.static("./uploads"));

const storage = multer.memoryStorage();
const upload = multer({ storage });


//////////////////search Route///////////////
router.route('/searchall').post(searchAllController.searchAll);

//////////////////Authentication Route///////////////
router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/lgnusr').post(authController.AdminUserLogin);


//////////////////User Route///////////////

router.route('/userdetails').post(userController.userDetails);
router.route('/mydetails').get(userController.myDetails);
router.route('/updatebiography').post(userController.updateBiography);
router.route('/mybiography').post(userController.myBiography);
router.route('/myphotos').post(userController.getUserPhotos);
router.route('/myvideos').post(userController.getUserVideos);
router.route('/addphoto').post(userController.addPhoto);
router.route('/addvideo').post(userController.addVideo);
router.route('/getphoto').post(userController.getPhoto)
router.route('/getvideo').post(userController.getVideo)
router.route('/vendor').post(userController.getTypeVendor)
router.route('/getvendordetail').post(userController.vendorBiography)
router.route('/updatevendorbio').post(userController.updateBiographyVendor)
router.route('/updatekyc').post(userController.updateBiographyServiceProvider)
router.route('/users').get(userController.getallUsers)
router.route('/searchvendor').get(userController.searchByVendorName)
router.route('/userstatus').post(userController.changeUserStatus)
router.route('/updaterank').post(userController.updateVendorRank)
router.route('/updateprofile').post(userController.updateVendorProfile)
router.route('/getpanchang').get(userController.getPanchang)
router.route('/updateavailabilty').post(userController.updateVendorAvailability)
router.route('/approvekyc').post(userController.approveUserKyc)
router.route('/getkyc').post(userController.getUserKycDetails)
router.route('/getuserlocation').post(userController.getUserLocation)
router.route('/updatepassword').post(userController.updatePassword)
router.route('/forgetpassword').post(userController.generateToken)

var uploadFile = multer({
    storage: multerS3({
        s3: s3,
        //acl: 'public-read',
        bucket: 'dharmlok',
		contentType: multerS3.AUTO_CONTENT_TYPE, 
        key: function (req, file, cb) {
			var nameFile = Date.now() + path.extname(file.originalname);
            cb(null, nameFile); //use Date.now() for unique file keys
        }
    })
});

//Upload Photos
router.post("/uploadphoto", uploadFile.single("file"), async (req, res) => {
	try{
		// const { buffer, originalname } = req.file;
		// const timestamp = Date.now();
		// const ref = `${timestamp}.webp`;
		// await sharp(buffer)
		// .webp({ quality: 20 })
		// .toFile("./uploads/" + ref);
		const ref = `${req.file.key}`;
		res.status(200).json({success : true,message: ref})
	}
	catch (error) {
		res.status(400).json({success : false,message: error.message})
	}
});


// router.post('/uploadphoto',upload.single("file"), async (req, res) => {
//     try{
//     	jwt.verify(req.headers.token, 'bootspider', async function(err, user){
//         	if (err) res.status(400).json({success : false,message: err.message});
// 			else{
// 				fs.access("../assets", (error) => {
// 					if (error) {
// 					  fs.mkdirSync("../assets");
// 					}
// 				  });
// 				const { buffer, originalname } = req.file;
// 				const timestamp = new Date().toDateString();
// 				const ref = `${timestamp}-${originalname}.webp`;
// 				await sharp(buffer)
// 				.webp({ quality: 60 })
// 				.toFile("../assets" + ref);
// 				//const imgUrl = `${req.file.filename}`;
// 				res.status(200).json({success : true,message: ref})
// 			}
// 		});
//     	}
// 	catch (error) {
//         res.status(400).json({success : false,message: error.message})
//     }
// })

//Upload Photos

// router.post('/uploadvideo', uploadFile.array('file'), function (req, res, next) {
//     res.send(200).json({
//         success: "true",
//         message: `${req.file.filename}`
//     });
// });
// router.post()
router.post('/uploadvideo',uploadFile.single("file"), async (req, res) => {
    try{
		const videoUrl = `${req.file.key}`;
		res.status(200).json({success : true,message: videoUrl})
    	}
	catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
})

router.route('/deletephoto').post(userController.deleteUserPhoto);
router.route('/deletevideo').post(userController.deleteUserVideo);

//////////////////Post Route///////////////

router.route('/uploadpost').post(postController.uploadPost);
router.route('/getuserpost').post(postController.getUserPost);
router.route('/getallpost').post(postController.getAllPost);
router.route('/likepost').post(postController.likePost);
router.route('/unlikepost').post(postController.unlikePost);
router.route('/viewpost').post(postController.viewPost);
router.route('/mostliked').get(postController.mostLikedPost);
router.route('/deletepost').post(postController.deletePost);

//////////////////Service Route///////////////
router.route('/addservice').post(serviceController.addService);
router.route('/myservice').post(serviceController.myService);
router.route('/getservicedetail').post(serviceController.getServiceById);
router.route('/deleteservice').post(serviceController.deleteService);
router.route('/updateservice').post(serviceController.updateService);
router.route('/getallservice').post(serviceController.getAllService);
router.route('/addservicecategory').post(serviceController.addCategory);
router.route('/getservicecategory').get(serviceController.getAllCategories);
router.route('/deleteservicecategory').post(serviceController.deleteCategory);
router.route('/getservicepandit').post(serviceController.getServicePandit);
router.route('/updateservicestatus').post(serviceController.updateServiceStatus);

//////////////////Product Route///////////////
router.route('/addproduct').post(productController.addProduct);
router.route('/productdetail').post(productController.productDetail);
router.route('/getallproduct').post(productController.getAllProduct);
router.route('/myproduct').get(productController.myProduct);
router.route('/updateproduct').post(productController.updateProduct);
router.route('/updateproductquantity').post(productController.updateProductQuantity);
router.route('/updateproductstatus').post(productController.updateProductStatus);
router.route('/addcategory').post(productController.addCategories);
router.route('/getproductcategory').get(productController.getAllCategories);
router.route('/deletecategory').post(productController.deleteCategory);
router.route('/search').post(productController.search);
router.route('/searchcategory').post(productController.searchByCategory);
router.route('/searchtype').post(productController.searchByType);
router.route('/filterproduct').post(productController.filterProduct);
router.route('/approveproduct').post(productController.approveProduct);
router.route('/deleteproduct').post(productController.deleteProduct);



//////////////////Comment Route///////////////

router.route('/commentpost').post(commentController.commentPost);
router.route('/commentstatus').post(commentController.commentStatus);
router.route('/getallcomment').get(commentController.getAllComment);
router.route('/getcomment').post(commentController.getPostComment);

//////////////////Event Route///////////////

router.route('/addevent').post(eventController.addEvent);
router.route('/myevents').get(eventController.myEvents);
router.route('/getevents').post(eventController.getEvents);
router.route('/getallevents').get(eventController.getAllEvents);
router.route('/geteventdetail').post(eventController.getEventDetail);
router.route('/eventstatus').post(eventController.eventStatus);
router.route('/updateeventviewstatus').post(eventController.deleteEvent);
router.route('/updateevent').post(eventController.updateEvent);
router.route('/addeventcategory').post(eventController.addCategory);
router.route('/geteventcategory').get(eventController.getAllCategories);
router.route('/deleteeventcategory').post(eventController.deleteCategory);

//////////////////Booking Route///////////////

router.route('/addbooking').post(bookingController.createBooking);
router.route('/getallbooking').post(bookingController.getAllBooking);
router.route('/deletebooking').post(bookingController.deleteBooking);
router.route('/updatebooking').post(bookingController.updateBooking);
router.route('/getbooking').post(bookingController.getBookingById);
router.route('/mybooking').post(bookingController.myBooking);


//////////////////Dharamshala Route///////////////

router.route('/adddharamshala').post(dharamshalaController.createDharamshala);
router.route('/getalldharamshala').post(dharamshalaController.getAllDharamshala);
router.route('/updatedharamshalastatus').post(dharamshalaController.updateDharamshalaStatus);
router.route('/updatedharamshala').post(dharamshalaController.updateDharamshala);
router.route('/getdharamshala').post(dharamshalaController.getDharamshalaById);
router.route('/deletedharamshala').post(dharamshalaController.deleteDharamshala);


//////////////////Audio Route///////////////

router.route('/addaudio').post(audioController.addAudio);
router.route('/getallaudio').get(audioController.getAllAudio);
router.route('/deleteaudio').post(audioController.deleteAudio);
router.route('/updateaudio').post(audioController.updateAudio);
router.route('/getaudio').post(audioController.getAudioById);
router.route('/addaudiocategory').post(audioController.addAudioCategory);
router.route('/getaudiocategory').get(audioController.getAllCategories);
router.route('/deleteaudiocategory').post(audioController.deleteCategory);
router.route('/addplaylist').post(audioController.addAudioPlaylist);
router.route('/deleteplaylist').post(audioController.deletePlaylist);
router.route('/getallplaylist').get(audioController.getAllPlaylist);
router.route('/getcategoryplaylist').post(audioController.getPlaylistFromCategory);
router.route('/updatecategory').post(audioController.updateAudioCategory);
router.route('/updateplaylist').post(audioController.updateAudioPlayList);
router.route('/getplaylistbyid').post(audioController.getAllPlaylistById);

//////////////////Bal Vidya Route///////////////


router.route('/createbalvidya').post(balVidyaController.createBalVidya); 
router.route('/getallbalvidya').post(balVidyaController.getAllBalVidya);
router.route('/updatebalvidyastatus').post(balVidyaController.updateBalVidyaStatus);
router.route('/updatebalvidya').post(balVidyaController.updateBalVidya);
router.route('/getbalvidya').post(balVidyaController.getBalVidyaById);
router.route('/deletebalvidya').post(balVidyaController.deleteBalVidya);

// router.route('/getBalVidyaPlans').get(balVidyaSubscriptionController.getAllBalVidyaPlans);
// router.route('/createBalVidyaSubscription').post(balVidyaSubscriptionController.createSubscription);
// router.route('/addSubscription').post(balVidyaSubscriptionController.addSubscription);
// router.route('/getSubscriptionDetails').post(balVidyaSubscriptionController.getSubscriptionDetails);
// router.route('/cancelSubscription').post(balVidyaSubscriptionController.cancelSubscription);
// router.route('/updateSubscription').post(balVidyaSubscriptionController.updateSubscription);



//////////////////Ad Route///////////////


router.route('/createad').post(adController.createAd); 
router.route('/getallad').post(adController.getAllAd);
router.route('/deletead').post(adController.deleteAd);
router.route('/updatead').post(adController.updateAd);
router.route('/getad').post(adController.getAdById);

//////////////////Dharshan Route///////////////

router.route('/createdharshan').post(dharshanController.createDharshan);
router.route('/getalldharshan').post(dharshanController.getAllDharshan);
router.route('/deletedharshan').post(dharshanController.deleteDharshan);
router.route('/updatedharshan').post(dharshanController.updateDharshan);
router.route('/getdharshan').post(dharshanController.getDharshanById);
router.route('/updatedharshanrank').post(dharshanController.updateDharshanRank);



////////////////Order Route////////////////////
router.route('/createorder').post(orderController.createOrder);
router.route('/verifyorder').post(orderController.verifyOrder);
router.route('/deleteorder').post(orderController.deleteOrder);
router.route('/myorder').post(orderController.myOrders);
router.route('/getorderdetail').post(orderController.orderDetailById);
router.route('/pendingorder').get(orderController.orderPending);
router.route('/allorder').post(orderController.allOrders);
router.route('/approveorder').post(orderController.approveOrder);
router.route('/getcountdetail').get(orderController.getDetailsCount);
router.route('/serviceproviderorderdetail').get(orderController.getServiceOrderDetails);
router.route('/userbalancelist').get(orderController.getUserBalance);
router.route('/createserviceorder').post(orderController.createServiceOrder);
router.route('/adminbalance').post(orderController.getAdminBalance);


//////////////////Temple Route///////////////


router.route('/createtemple').post(templeController.addTemple); 
router.route('/gettempledetail').post(templeController.templeDetailById);
router.route('/updatetemplestatus').post(templeController.updateTempleStatus);
router.route('/updatetemple').post(templeController.updateTemple);
router.route('/getalltemples').post(templeController.getAllTemple);
router.route('/getstate').get(templeController.getState);
router.route('/getcities').post(templeController.getCity);
router.route('/getweather').post(templeController.getTempleWeather);
router.route('/gettempleadmin').post(templeController.getAllTempleAdmin);
router.route('/deletetemple').post(templeController.deleteTemple);


//////////////////EBook Route///////////////


router.route('/createebook').post(eBookController.createEbook); 
router.route('/getebookdetail').post(eBookController.getEbookById);
router.route('/updateebookstatus').post(eBookController.updateEbookStatus);
router.route('/updateebook').post(ebookController.updateEbook);
router.route('/getallebook').post(ebookController.getAllEbook);
router.route('/deleteebook').post(ebookController.deleteEbook);


//////////////////Customer Route///////////////

router.route('/addcustomer').post(customerController.createCustomer); 
router.route('/getallcustomer').get(customerController.getAllCustomer);

//////////////////Home Route///////////////


router.route('/addhomedetail').post(homeController.addHomePage); 
router.route('/gethome').post(homeController.getHomePageDetails);
router.route('/updatehome').post(homeController.updateHomePageDetails);
router.route('/deletehome').post(homeController.deleteHome);
router.route('/gethomedetail').post(homeController.getHomePageDetailsById);


//////////////////Cart Route///////////////


router.route('/addtocart').post(cartController.addToCart); 
router.route('/updatecart').post(cartController.updateCart);
router.route('/deletecart').post(cartController.deleteCartItem);
router.route('/getcart').get(cartController.getCartItems);


//////////////////BookMark Route///////////////


router.route('/addbookmark').post(bookMarkController.addBookMark); 
router.route('/deletebookmark').post(bookMarkController.deleteBookMark);
router.route('/getbookmark').get(bookMarkController.getBookMarks);



//////////////////WithDrawal Route///////////////

router.route('/addwithdrawalrequest').post(balanceController.createRequest); 
router.route('/getwithdrawal').get(balanceController.getAllRequest);
router.route('/addcreditdetails').post(balanceController.addDetailsCredit); 
router.route('/getallcredit').get(balanceController.getAllCreditList);


//////////////////Enquire Route///////////////

router.route('/addenquiry').post(enquireController.addEnquiry); 
router.route('/getallenquiry').get(enquireController.getAllEnquiry);


//////////////////Coupon Route///////////////

router.route('/addcoupon').post(couponController.addCoupon); 
router.route('/deletecoupon').post(couponController.deleteCoupon);
router.route('/getallcoupon').post(couponController.getAllCoupons); 
router.route('/updatecoupon').post(couponController.updateCouponDetails);
router.route('/updatecouponstatus').post(couponController.updateCouponStatus);
router.route('/applycoupon').post(couponController.applyCoupon);
router.route('/getcouponusage').post(couponController.getCouponUsage);




/////////////////Contact Us/////////////////////
router.route('/contactus').post(contactController.addContactUs);
router.route('/getcontactus').get(contactController.getContactUs);


/////////////Streaming//////////////////////
