
const express =require('express')
const nodemailer =require('nodemailer')
const emailExistence=require('email-existence')
// const fileUpload = require('express-fileupload');
const cors=require('cors')
const formData=require('express-form-data')
const fs =require('fs')
const app=express()

app.use(express.urlencoded())
app.use(express.json())


app.use(cors({
  credentials: true,
  origin: true,
}));

// app.use(fileUpload({
//   debug: true
// }));
app.use(formData.parse())

//conection connect

const mongoose=require('mongoose')
const User=require('./users')
const Posts=require('./posts')
const Likes=require('./likes')

mongoose.connect('mongodb+srv://Sachin:123@cluster0.wryif.mongodb.net/PPL?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology:true 
}).then(()=>{console.warn("connection done!!!")})

//API For Registr

app.post('/register',(req,res)=>{
   const {username,password,email,firstname,lastname}=req.body
    
   // cheak mail does exit or not 
   emailExistence.check(email, function(err,valid){
      if(valid)
      {
        User.findOne({email:email},(err,data)=>{
          if(data)
          {
            res.send({massege:"Already have this user"})
            
          }
          else{
           const user= new User({
             _id:new mongoose.Types.ObjectId(),
                username,  //post title, post discription , post imggers,  user_id,post date 
                password,
                email,
                firstname,
                lastname
           })
            user.save(err=>{
              if(err)
              {
                console.log("Error in save")
                res.send({status:false,message:'Something Wrong'})
              }
              else{
                console.log("susses fully connected")
                res.send({status:true,message:'user Added',user:user})

                ///send mail to user of welcome 
                let transporter = nodemailer.createTransport({
                  service:'gmail',
                  auth:{
                    user: 'swadeeppandey56@gmail.com', 
                    pass: 'Swadeep@123', 
                  }
                });
                let mailDetails = {
                  from: 'swadeeppandey56@gmail.com',
                  to: email,
                  subject: 'Welcome ',
                  text: 'dear custemer welcome to our plateform '
                };
              transporter.sendMail(mailDetails, function(err, data){
                  if(err) {
                      console.log(err);
                  } else {
                      console.log('Email sent successfully');
                  }
                });
            
              }
            })
          }
         })
      }
      else{
          // res.send({status:false,message:'not valid email'})
          console.log("not valid email address")
      }
   });

  
})
app.listen(5000,()=>{
  console.log("Api called")
})

//Api For LOGIN Page

app.post('/login',(req,res)=>{
  const {email,password} = req.body
  User.findOne({email:email},(err,user)=>{
    if(user){
        if(password===user.password){
          res.send({messages:"LogIn", user:user})
        }
        else{
      res.send({messages:"Wrong password"})
        
        }
    }
    else{
      console.log("Email is wrong ")
    }
  })

})

//Forget password API

// app.post('/forgotEmail',(req,res)=>{
//     User.findOne({email:req.body.forgotEmail},(err,data)=>{
//       if(err) {console.log(err)}
//       if(data===null){
//           res.send({status:false,message:'No user found'})
//       }else{
//         console.log(data)
//         res.send({status:true,data:data})

//       }
//     })
// })
// ResetPasswor API
app.post('/resetpassword',(req,res)=>{
      User.findById({_id:req.body.id},(err,data)=>{
        if(data!==null){
         User.updateOne({_id:req.body.id},{$set:{password:req.body.forgotPassword}},(err,data)=>{
            
         })
        }
         res.send({data:data})
       
      })
})

//Upload Post Api)


app.post('/uploadpostcontent',(req,res)=>{
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  var sampleFile = req.files.image;
fs.readFile(sampleFile.path, function(err, data){
  var path = '../post_images' + '/' + sampleFile.name;
  fs.writeFile(path, data, function(err) {
    console.log(err)
  });
});
    
  const date=new Date()
      let ti=date.getHours()+date.getMinutes()
  const {title,category,userId,like,unlike,fullName}=req.body;
  console.log(fullName)
     const posts = new Posts({
      _id:new mongoose.Types.ObjectId(),
         userId,
         title,
         category,
         image:'post_images/'+sampleFile.name,
         time:new Date().toLocaleTimeString(),
         date:new Date().toLocaleDateString(),
         like, 
         unlike,
         fullName
     })

     posts.save(err=>{
      if(err)
      {
        console.log("Error in save")
        res.send({status:false,message:'Something Wrong'})
      }
      else{
        console.log("susses fully connected")
        res.send({status:true,message:'user Added',posts:posts})
      }
    })
})

// Get  posts data from database
app.post('/getPost',async (req,res)=>{
  Posts.find({},(err,data)=>{
      res.send(data)
  }).skip(req.body.skip).limit(2)
})

// get filter data 
app.post('/filterPost',(req,res)=>{
    Posts.find({category:req.body.search},(err,data)=>{ 
       res.send(data)
    })
})

// Like Api 
app.post('/like',async (req,res)=>{
const post= await Posts.findById(req.body.postId);
if(!post.like.includes(req.body.userId))
    {
      await post.updateOne({ $push: {like:req.body.userId}});
    
    }
    else{
      await post.updateOne({$pull : {like:req.body.userId}});
    }
  //res.send(data)
})

// unlike api 

app.post('/unlike',async (req,res)=>{
  const post= await Posts.findById(req.body.postId);
  if(!post.unlike.includes(req.body.userId))
      {
        await post.updateOne({ $push: {unlike:req.body.userId}});
      }
      else{
        await post.updateOne({$pull : {unlike:req.body.userId}});
      }
    //res.send(data)
  })

  // Nodemailer

  
  app.post('/forgotEmail',(req,res)=>{
    User.findOne({email:req.body.forgotEmail},(err,data)=>{
      if(err){console.log(err)}
      if(data===null){
          res.send({status:false,message:'No user found'})
      }else{
        let transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user: 'swadeeppandey56@gmail.com', 
            pass: 'Swadeep@123', 
          }
        });
        let mailDetails = {
          from: 'swadeeppandey56@gmail.com',
          to: req.body.forgotEmail,
          subject: 'Forgot Password',
          text: req.body.location+'/resetpassword/'+data._id
        };
      transporter.sendMail(mailDetails, function(err, data){
          if(err) {
              console.log(err);
          } else {
              console.log('Email sent successfully');
          }
        });

      }
    })
})


//   let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//       user: 'swadeeppandey56@gmail.com', 
//       pass: 'Swadeep@123', 
//     }
//   });
//   let mailDetails = {
//     from: 'swadeeppandey56@gmail.com',
//     to: 'sunnysingh8050101@gmail.com',
//     subject: 'Test mail',
//     text: ''
//   };
// transporter.sendMail(mailDetails, function(err, data){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Email sent successfully');
//     }
//   });