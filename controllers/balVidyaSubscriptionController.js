const bookmarkModel = require("../models/bookmarkModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: "rzp_live_NHlvgq2xKtPVa0",
  key_secret: "EEGH15M85zSA5iuZtFmo4Jig",
});
const plans = [
  {
    plan_id: "plan_NXtaF1lxmM15ca",
    plan_name: "Monthly",
    duration: "1 Month(s)",
    price: 29,
  },
  {
    plan_id: "plan_NXtbdpXYIEfdtR",
    plan_name: "Quaterly",
    duration: "3 Month(s)",
    price: 79,
  },
  {
    plan_id: "plan_NXtd5lsKI139Yc",
    plan_name: "Half Yearly",
    duration: "6 Month(s)",
    price: 159,
  },
  {
    plan_id: "plan_NXtdWeHGgp0aO5",
    plan_name: "Yearly",
    duration: "1 Year(s)",
    price: 299,
  },
];

module.exports = {
  getAllBalVidyaPlans: async function (req, res) {
    try {
      var plans;
      await instance.plans.all().then((res) => (plans = res));
      res.status(200).json({ success: true, message: plans });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createSubscription: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        let subscriptionDetails = await userModel
          .findOne({ _id: user.id })
          .select("subscription");
        subscriptionDetails = { ...subscriptionDetails }._doc;
        console.log(subscriptionDetails);
        console.log(req.body);
        if (subscriptionDetails.subscription == "none") {
          subscriptionDetails.planId = req.body.plan_id;
          console.log(subscriptionDetails);
          await instance.subscriptions
            .create({
              plan_id: req.body.plan_id,
              total_count: 60,
            })
            .then((data) => {
              subscriptionDetails.subscription = data.id;
              subscriptionDetails.status = data.status;
            })
            .catch((err) =>
              res.status(400).json({ success: false, message: err.message })
            );
        } else {
          await instance.subscriptions
            .fetch(subscriptionDetails.subscription)
            .then((data) => {
              subscriptionDetails.status = data.status;
              subscriptionDetails.planId = data.plan_id;
            })
            .catch((err) =>
              res.status(400).json({ success: false, message: err.message })
            );
        }
        res.status(200).json({ success: true, message: subscriptionDetails });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getSubscriptionDetails: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        var subscriptionDetails = await userModel
          .findOne({ _id: user.id })
          .select("subscription")
          .select("plan_id");
        await instance.subscriptions
          .fetch(subscriptionDetails.subscription)
          .then((data) => {
            subscriptionDetails = { ...subscriptionDetails }._doc;
            let status = data.status;
            res.status(200).json({
              success: true,
              message: { ...subscriptionDetails, status },
            });
          })
          .catch((err) => {
            subscriptionDetails.status = "none";
            res
              .status(200)
              .json({ success: true, message: subscriptionDetails });
          });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  addSubscription: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        var subscriptionDetails;
        const currPlan = plans.find((obj) => {
          return obj.planId == req.body.plan_id;
        });
        subscriptionDetails = {
          subscription: req.body.subscription,
          plan_id: req.body.planId,
        };
        let hmac = crypto.createHmac("sha256", req.body.paymentId + "|" +  req.body.subscription);
        hmac.update("EEGH15M85zSA5iuZtFmo4Jig");
        const generated_signature = hmac.digest('hex');
        console.log(req.body);
        console.log(generated_signature);
          if (err)
            res.status(400).json({ success: false, message: err.message });
          else {
            await userModel.findOneAndUpdate(
              { _id: user.id },
              {
                subscription: subscriptionDetails.subscription,
                plan_id: subscriptionDetails.plan_id,
              }
            );
            res
              .status(200)
              .json({ success: true, message: {canAccess: true} });
          }
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  verifySubscription: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        let subscriptionDetails = await userModel
          .findOne({ _id: user.id })
          .select("subscription").select("plan_id");
          subscriptionDetails = { ...subscriptionDetails }._doc;
          
          res.status(200).json({success: false,message: {canAccess: true}});
        // if(subscriptionDetails.subscription=='none'){
        //   res.status(200).json({success: false,message: {canAccess: false}});
        // }
        // else{

        //   data= await instance.subscriptions.fetch(subscriptionDetails.subscription);
        //   console.log('here');
        //   if(data.status=='active'){
        //     res.status(200).json({success: false,message: {canAccess: true}});
        //   }
        //   else{
        //     if (data.status=='completed') {
        //       if( Date.now()<data.end_at){
        //         res.status(200).json({success: false,message: {canAccess: true}});
                
        //       }
        //       else{
        //         res.status(200).json({success: false,message: {canAccess: false}});
        //       }
        //     }
        //   }
        // }

      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  cancelSubscription: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        subscriptionDetails = {
          subscription: "none",
          plan_id: "none",
          status: "none",
        };
        data = await userModel.findOneAndUpdate(
          { _id: user.id },
          {
            subscription: subscriptionDetails.subscription,
            plan_id: subscriptionDetails.plan_id,
            bookAccess: subscriptionDetails.bookAccess,
            videoAccess: subscriptionDetails.videoAccess,
          }
        );
        instance.subscriptions
          .cancel(data.subscription)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(200).json({ success: true, message: subscriptionDetails });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateSubscription: async function (req, res) {
    try {
      jwt.verify(req.headers.token, "bootspider", async function (err, user) {
        const currPlan = plans.find((obj) => {
          return obj.planId == req.body.plan_id;
        });
        subscriptionDetails = {
          plan_id: req.body.plan_id,
          bookAccess: currPlan.books,
          videoAccess: currPlan.video,
        };
        data = await userModel.findOneAndUpdate(
          { _id: user.id },
          {
            subscription: subscriptionDetails.subscription,
            plan_id: subscriptionDetails.plan_id,
          }
        );
        subscriptionDetails.subscription = data.subscription;
        instance.subscriptions
          .update(data.subscription, {
            plan_id: subscriptionDetails.plan_id,
          })
          .then((res) => {})
          .catch((err) => {});
        res.status(200).json({ success: true, message: subscriptionDetails });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
