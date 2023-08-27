// const bookmarkModel = require("../models/bookmarkModel");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user");
// const Razorpay = require("razorpay");

// const instance = new Razorpay({
//   key_id: "rzp_test_5nAdC7NFLZ7syb",
//   key_secret: "GMtB9RProPkIMGP4Ra6uu280",
// });
// const plans = [
//   {
//     planId: "none",
//     planName: "No Plan",
//     books: false,
//     video: false,
//   },
//   {
//     planId: "plan_MDNuLpGDzcAYCY",
//     planName: "Basic",
//     books: true,
//     video: false,
//   },
//   {
//     planId: "plan_MDNux50TOf842A",
//     planName: "Premium",
//     books: true,
//     video: true,
//   },
// ];

// module.exports = {
//   getAllBalVidyaPlans: async function (req, res) {
//     try {
//       var plans;
//       await instance.plans.all().then((res) => (plans = res));
//       res.status(200).json({ success: true, message: plans });
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   },
//   createSubscription: async function (req, res) {
//     try {
//       jwt.verify(req.headers.token, "bootspider", async function (err, user) {
//         let subscriptionDetails = await userModel
//           .findOne({ _id: user.id })
//           .select("subscription");
//         subscriptionDetails = { ...subscriptionDetails }._doc;
//         console.log(subscriptionDetails);
//         console.log(req.body);
//         if (subscriptionDetails.subscription == "none") {
//           console.log(subscriptionDetails);
//           await instance.subscriptions
//             .create({
//               plan_id: req.body.plan_id,
//               total_count: 1,
//             })
//             .then((data) => {
//               subscriptionDetails.subscription = data.id;
//               subscriptionDetails.status = data.status;
//             })
//             .catch((err) =>
//               res.status(400).json({ success: false, message: err.message })
//             );
//         } else {
//           await instance.subscriptions
//             .fetch(subscriptionDetails.subscription)
//             .then((data) => {
//               subscriptionDetails.status = data.status;
//             })
//             .catch((err) =>
//               res.status(400).json({ success: false, message: err.message })
//             );
//         }
//         res.status(200).json({ success: true, message: subscriptionDetails });
//       });
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   },
//   getSubscriptionDetails: async function (req, res) {
//     try {
//       jwt.verify(req.headers.token, "bootspider", async function (err, user) {
//         var subscriptionDetails = await userModel
//           .findOne({ _id: user.id })
//           .select("subscription")
//           .select("plan_id")
//           .select("bookAccess")
//           .select("videoAccess");
//         await instance.subscriptions
//           .fetch(subscriptionDetails.subscription)
//           .then((data) => {
//             subscriptionDetails = { ...subscriptionDetails }._doc;
//             let status = data.status;
//             res
//               .status(200)
//               .json({
//                 success: true,
//                 message: { ...subscriptionDetails, status },
//               });
//           })
//           .catch((err) =>
//             {
//               subscriptionDetails.status="none";
//               res.status(200).json({ success: true, message: subscriptionDetails })}
//           );
//       });
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   },
//   addSubscription: async function (req, res) {
//     try {
//       jwt.verify(req.headers.token, "bootspider", async function (err, user) {
//         var subscriptionDetails;
//         const currPlan = plans.find((obj) => {
//           return obj.planId == req.body.plan_id;
//         });
//         subscriptionDetails = {
//           subscription: req.body.subscription,
//           plan_id: req.body.plan_id,
//           bookAccess: currPlan.books,
//           videoAccess: currPlan.video,
//         };
//         // instance.payments.paymentVerification({
//         //   'subscription_id':req.body.subscription,
//         //   'payment_id':req.body.payment_id,
//         //   'signature':req.body.signature
//         //   })
//         if (err) res.status(400).json({ success: false, message: err.message });
//         else {
//           await userModel.findOneAndUpdate(
//             { _id: user.id },
//             {
//               subscription: subscriptionDetails.subscription,
//               plan_id: subscriptionDetails.plan_id,
//               bookAccess: subscriptionDetails.bookAccess,
//               videoAccess: subscriptionDetails.videoAccess,
//             }
//           );
//           res.status(200).json({ success: true, message: subscriptionDetails });
//         }
//       });
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   },
//   cancelSubscription: async function (req,res) {
//     try {
//       jwt.verify(req.headers.token, "bootspider", async function (err, user) {
//         subscriptionDetails = {
//           subscription: "none",
//           plan_id: "none",
//           bookAccess: false,
//           videoAccess: false,
//           status: "none"
//         };
//         data=await userModel.findOneAndUpdate(
//           { _id: user.id },
//           {
//             subscription: subscriptionDetails.subscription,
//             plan_id: subscriptionDetails.plan_id,
//             bookAccess: subscriptionDetails.bookAccess,
//             videoAccess: subscriptionDetails.videoAccess,
//           }
//         );
//         instance.subscriptions.cancel(data.subscription).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
//         res.status(200).json({ success: true, message: subscriptionDetails });
//       })
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   },
//   updateSubscription: async function (req,res) {
//     try {
//       jwt.verify(req.headers.token, "bootspider", async function (err, user) {
//         const currPlan = plans.find((obj) => {
//           return obj.planId == req.body.plan_id;
//         });
//         subscriptionDetails = {
//           plan_id: req.body.plan_id,
//           bookAccess: currPlan.books,
//           videoAccess: currPlan.video,
//         };
//         data=await userModel.findOneAndUpdate(
//           { _id: user.id },
//           {
//             subscription: subscriptionDetails.subscription,
//             plan_id: subscriptionDetails.plan_id,

//           }
//         );
//         subscriptionDetails.subscription=data.subscription;
//         instance.subscriptions.update(data.subscription,{
//           plan_id:subscriptionDetails.plan_id,
//         }).then((res)=>{}).catch((err)=>{});
//         res.status(200).json({ success: true, message: subscriptionDetails });
//       })
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }
// };
