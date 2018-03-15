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
       var token = req.body.token || req.query.token || req.headers['x-access-token'];
       if(token){
           jwt.verify(token,app.get('superSecret'),function(error,decoded){
                if(error){
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }else{
                    req.decoded = decoded;
                    next()
                }
           })
       }else{
           console.log("not logged in")
       }
   }

  /*All the get method routes*/
    app.get("/home",function(req,res){
      res.render("index")
  });

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
                      res.json({"status":200})
                  }
              }
          }
      })
  })

    app.post('/login',passport.authenticate('local-login',{
        successRedirect :  '/dashboard',
        failureRedirect : '/',
        failureFlash : true
    }))
};