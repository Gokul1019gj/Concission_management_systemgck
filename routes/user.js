const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var userhelper=require('../helper/userhelper')
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user)
  
  
    res.render('user/login',{admin:true})
  

  })
  


router.post('/login',(req,res)=>{  //password change

  userhelper.dologin(req.body).then((details)=>{
    console.log(details);
    if(details.status==1){
      
      req.session.user=details.user
      
      res.render('user/password-change')
    }
    else if(details.status==2){
      let user=req.session.user=details.user
      
      req.session.loggedIn=true

      res.render('user/userform',{admin:true,user})

      
    }else{

     
      res.redirect('/')
      

    }

  })

})

router.post('/password-change',(req,res)=>{

  console.log(req.body)
  userhelper.changepassword(req.body).then(()=>{

    res.redirect('/')
  })
})


router.post('/submit-Form',(req,res)=>{
  let stid=req.session.user
  console.log(req.body);
  user=req.session.user
  
  // console.log(signature,photo)
  userhelper.formsubmit(req.body,stid.studid).then(()=>{    //form submit and save photo to server
    // console.log(req.session.user);
    //  let signature=req.files.signature
    //  let photo=req.files.photo

    //  photo.mv('./public/user-imagedata/'+id+'pic'+'.jpg')
    //  signature.mv('./public/user-imagedata/'+id+'sig'+'.jpg')
    res.render('user/userform',{admin:true,user})
    
  })

  
}),

router.post('/preview-Form',(req,res)=>{
   let id=req.session.user.studid
     let signature=req.files.signature
     let photo=req.files.photo
     let details=req.body
     photo.mv('./public/user-imagedata/'+id+'pic'+'.jpg')
     signature.mv('./public/user-imagedata/'+id+'sig'+'.jpg')
  console.log(req.body,signature.name,photo);
  res.render('user/dummyform',{details,signature,photo,id,admin:true})
})

router.get('/concessionstatus',(req,res)=>{
  let stid=req.session.user.studid
  // console.log(stid.studid);
  userhelper.getstatus(stid).then((response,details)=>{
    console.log(response,details);
    res.render('user/applicationstatus',{response,stid,admin:true,user:true})
  })
  
})


router.get('/coursecertificatestatus',(req,res)=>{
  let stid=req.session.user.studid
  // console.log(stid.studid);
  userhelper.getccstatus(stid).then((response,details)=>{
    console.log(response,details);
    res.render('user/ccapplistatus',{response,stid,admin:true,user:true})
  })
  
})

router.get('/coursecertificate',(req,res)=>{

  res.render('user/coursecertificate',{admin:true,user:true})
})

router.post('/coursedata',(req,res)=>{
  let id=req.session.user
  userhelper.coursecertificatedata(req.body,id.studid).then((response)=>{
    console.log(response);
    res.redirect('/coursecertificate')
  })
})
router.get('/virtualconcession',(req,res)=>{

  userhelper.vconcession(req.session.user.studid).then((response)=>{
    console.log(response)
    res.render('user/virtual-concission',{response,admin:true,user:true})
  })
})
router.get('/virtualcc',(req,res)=>{
  userhelper.vcc(req.session.user.studid).then((response)=>{

    res.render('user/virtual-cc',{response,admin:true,user:true})
  })

 
})

router.get('/student',(req,res)=>{

  res.redirect('/')
})

router.get('/home',(req,res)=>{
  let user=req.session.user
  
  res.render('user/userform',{admin:true,user:true})

})

router.get('/logout',(req,res)=>{

  req.session.destroy()
  res.redirect('/')
})

router.get('/regstrcomplaint',(req,res)=>{

  res.render('user/complaint',{admin:true,user:false})
})


router.post('/registercomplaint',(req,res)=>{
  let stid=req.session.user.studid
  userhelper.rgstrcmplt(stid,req.body).then((response)=>{
    res.redirect('/home')
  })


})
module.exports = router;
