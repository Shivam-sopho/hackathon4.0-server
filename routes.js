/*Dependencies*/
var config = require("./config");
var mongoose = require("mongoose");
require("./models/user");
var User = mongoose.model("User");
var jwt = require("jsonwebtoken")
/*Export the routes*/
module.exports = function(app,passport){
    /*middleware function to check the proper authentication */
   function isLoggedIn(req,res,next){
       if(req.isAuthenticated()){
           return next();
       }else{
           res.redirect("/")
       }
   }

  /*All the get method routes*/
    app.get("/",function(req,res){
      res.render("index1")
    });

    app.get("/dashboard",isLoggedIn,function(req,res){
        res.render("dashboard",{"user":req.user})
    });
    app.get("/feedback",isLoggedIn,function(req,res){
        res.render("feedback",{"user":req.user})
    });

    app.get("/checkFeedback",isLoggedIn,function(req,res){
        res.render("feedbackcheck",{"user":req.user})
    });

    app.get("/logout",function(req,res){

    });

    app.get('/transaction',isLoggedIn,function(req,res){
      res.render('transaction',{"user":req.user});
    })
    app.get('/pending',isLoggedIn,function(req,res){
      res.render('pending',{"user":req.user});
    })

    app.get("/newService",isLoggedIn,function(req,res){
      res.render("newService",{"user":req.user})
    })

    app.get("/bankTransfer",isLoggedIn,function(req,res){

      res.render("bankTransfer",{"user":req.user,"amount":req.query.amount})
    })

  /* All the post method routes */
    app.post("/android/login",function(req,res){
      var data = req.body;
      /*Find the proper username if we dont get username send status 404 and if wrong
      authentication then send 401 in case of success 200.Name of the success token is
      super secret
       */
      User.findOne({"username":data.username},function(error,user){
          if(error){

              res.json({"status":500})
          }else{
              if(!user){
                  res.json({"status":404})
              }else if(user){
                  if(user.password !== data.password){
                      res.json({"status":401})
                  }else{
                      res.json({"status":200,"data":user})
                  }
              }
          }
      })
    });

    app.post("/addmoney",isLoggedIn,function (req,res) {

        var paymentDetail = JSON.parse(req.body.contents);
        var json = {}
        json.user = req.user
        json.aadhaar = paymentDetail.aadhaar
        json.service = paymentDetail.service
        json.subService = paymentDetail.subService;
        json.amount = paymentDetail.amount;
        json.serviceCharge = paymentDetail.serviceCharge
        console.log(typeof(paymentDetail.service))
        console.log(json)
        //res.render("addmoney",json)
       
        res.render("addmoney",json);
    })

    app.post('/login',passport.authenticate('local-login',{
        successRedirect :  '/dashboard',
        failureRedirect : '/',
        failureFlash : true
    }))
    

};
