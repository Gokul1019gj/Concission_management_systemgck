const { response } = require('express');
var express = require('express');
var router = express.Router();
var ksrtcadminhelper=require('../helper/ksrtcadminhelper')
/* GET users listing. */
router.get('/', function(req, res, next) {
  


    res.render('ksrtcadmin/login',{ksrtcadmin:true})
  })
  router.get('/home',(req,res)=>{
    ksrtcadminhelper.getdetails().then((response)=>{
      res.render('ksrtcadmin/ksrtcview',{response,ksrtcadmin:true,user:true})
    })
    
  })

router.post('/login',(req,res)=>{

  ksrtcadminhelper.login(req.body).then((response)=>{
      let user=req.session.user=response.user
    if(response.status==true){

      ksrtcadminhelper.getdetails().then((response)=>{
        res.render('ksrtcadmin/ksrtcview',{response,ksrtcadmin:true,user})
      })
    }
  })

  

})

router.post('/approve_form',(req,res)=>{

  ksrtcadminhelper.aproveksrtc(req.body).then(()=>{
    res.redirect('/ksrtcadmin/home')
  })
})

router.post('/rejectform',(req,res)=>{
  ksrtcadminhelper.rejectksrtc(req.body).then((response)=>{
    res.redirect('/ksrtcadmin/home')
  })
})

router.get('/aprovedlist',(req,res)=>{
  ksrtcadminhelper.getdetails().then((response)=>{
    res.render('ksrtcadmin/ksrtcaprovedlist',{response,ksrtcadmin:true,user:true})
  })
})
 
router.get('/rejectedlist',(req,res)=>{
  ksrtcadminhelper.getdetails().then((response)=>{
    res.render('ksrtcadmin/ksrtcrejectedlist',{response,ksrtcadmin:true,user:true})
  })
})


router.get('/ksrtcpreview/:id',(req,res)=>{
  ksrtcadminhelper.preview(req.params.id).then((response)=>{
    res.render('ksrtcadmin/ksrtcpreview',{response,ksrtcadmin:true,user:true})
  })
})

router.get('/ksrtcadminuser',(req,res)=>{
  res.redirect('/ksrtcadmin')
})
  
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/ksrtcadmin')
})

module.exports = router;
