var express = require('express');
var router = express.Router();
var User=require('../lib/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//login
router.post('/login',function(req,res){
  var username=req.body.username;
  var password= req.body.password;
  User.findOne({username:username,password:password},function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send("User not found or password mismatch");
    }
    req.session.user=user;
    return res.status(200).send();
  })

//forgot password
router.put('/forgotpassword',function(req,res){
  var username=req.body.username;
  User.findOne({username:username},function(err,user){
    if (err){
      console.log(err);
      return res.status(400).send();
    }
    if(!user){
    
      return res.status(401).send("User not found");
      
    }
    else{
      if(res.body.password)
      {
        user.password=res.body.password;
      }
      user.save(function(err,updateobject){
        if(err){
          console.log(err);
          return res.status(500).send();
        }
        else{
          return res.send(updateobject);
        }
      })
    }
      })



    
})



});
//dashboard after logged in
router.get('/dashboard',function(req,res){
  if(!req.session){
    return res.status(401).send();
  }
  return res.status(200).send("welcome !! successfully logged In");
})





 //register 
router.post('/register',function(req,res){
  var username=req.body.username;
  User.findOne({username:username},function(err,user){
    if(err){
      console.log(err);
      return res.status(400).send();
    }
    if(user){
      return res.status(401).send("User already exist");
    }
    
  else{
  var password= req.body.password;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;


  var newuser =new User();
  newuser.username=username;
  newuser.password=password;
  newuser.firstname=firstname;
  newuser.lastname=lastname;
  newuser.save(function(err,saveUser){
  if(err){
    console.log(err);
    return res.status(500).send();
  }
  
    return res.status(200).send();
    
})
  }
})
  
  })

module.exports = router;

