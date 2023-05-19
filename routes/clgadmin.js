const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var clgadminhelper=require('../helper/clgadminhelper')
/* GET users listing. */
router.get('/', function(req, res, next) {
  // clgadminhelper.show_details_clgadmin().then((response)=>{
  //   console.log(response);
    
    res.render('clgadmin/frontpageclg',{login:true,bt:true,logo:true})
  // })

  
  
})


router.get('/clghome',(req,res)=>{

  clgadminhelper.show_details_clgadmin().then((data)=>{
    console.log(response);
    res.render('clgadmin/viewapplications',{data,user:true,login:false,bt:true,box:true})
  })
})

router.get('/viewapplications',(req,res)=>{
  clgadminhelper.show_details_clgadmin().then((data)=>{
    console.log(response);
    res.render('clgadmin/viewapplications',{data,user:true,login:false,bt:true})
})
})
router.get('/login',(req,res)=>{

  res.render('clgadmin/login',{login:false,logo:true,home:true})
})

router.post('/clglogin',(req,res)=>{
  console.log(req.body)
 
  clgadminhelper.login(req.body).then((response)=>{
    let user=req.session.user=response.user

    if(response.status){
      clgadminhelper.show_details_clgadmin().then((data)=>{
        res.render('clgadmin/viewapplications',{data,user,login:false,bt:true,box:true})
      })
      
    }
  })
})


router.get('/add-student',(req,res)=>{
  res.render('clgadmin/add-student')
})

router.post('/approve_form',(req,res)=>{
   
  console.log(req.body);

  clgadminhelper.approve_form(req.body).then((response)=>{
   res.redirect('/clgadmin/approvedconcessionappli')
  })
})

router.post('/rejectform',(req,res)=>{
  clgadminhelper.rejectform(req.body).then((response)=>{
    res.redirect('/clgadmin/rejectedconcession')
  })
})




router.post('/add-student',(req,res)=>{

//  console.log(req.body);
 clgadminhelper.addstudent(req.body).then(()=>{
   res.render('clgadmin/add-student')
 })
 

})

router.get('/coursecertificateview',(req,res)=>{

  clgadminhelper.viewccappli().then((response)=>{

    res.render('clgadmin/view-ccappli',{response,user:true})
  })
})

router.post('/approve_ccform',(req,res)=>{
  // console.log(req.params.id)
  clgadminhelper.approveccform(req.body).then(()=>{
    res.redirect('/clgadmin/approvedccview')
  })

})

router.post('/rejectccform',(req,res)=>{

  clgadminhelper.rejectccform(req.body).then((response)=>{
    res.redirect('/clgadmin/rejectedccview')
  })
})

router.get('/main',(req,res)=>{
  res.redirect('/clgadmin')
})






router.get('/preview/:id',(req,res)=>{
  console.log(req.params.id);

  clgadminhelper.preview(req.params.id).then((response)=>{
    console.log(response);
    res.render('clgadmin/clgpreview',{response})
  })
})

router.get('/previewcc/:id',(req,res)=>{

  clgadminhelper.previewcc(req.params.id).then((response)=>{

    res.render('clgadmin/clgccpreview',{response})

  })
})


router.get('/approvedconcessionappli',(req,res)=>{

  clgadminhelper.show_details_clgadmin().then((response)=>{
    res.render('clgadmin/approvedconcessionapllication',{response,user:true})
  })
})

router.get('/rejectedconcession',(req,res)=>{
  clgadminhelper.show_details_clgadmin().then((response)=>{
    res.render('clgadmin/rejectedconcession',{response,user:true})
  })
})

router.get('/approvedccview',(req,res)=>{
  clgadminhelper.viewccappli().then((response)=>{
    res.render('clgadmin/approvedccappli',{response,user:true})
  })
})

router.get('/rejectedccview',(req,res)=>{
  clgadminhelper.viewccappli().then((response)=>{
    res.render('clgadmin/rejectedccappli',{response,user:true})
  })
})

router.get('/ksrtcaproved',(req,res)=>{

  clgadminhelper.show_details_clgadmin().then((response)=>{
    res.render('clgadmin/ksrtcaproved',{response,user:true})
  })


})

router.get('/ksrtcrejected',(req,res)=>{

  clgadminhelper.show_details_clgadmin().then((response)=>{
    res.render('clgadmin/ksrtcrejected',{response,user:true})
  })


})

router.get('/viewcomplaint',(req,res)=>{

clgadminhelper.getcomplaint().then((response)=>{
  console.log(response)
  res.render('clgadmin/viewcomplaints',{response,user:true})
})

})
 router.get('/dltcomplaint/:id',(req,res)=>{

  clgadminhelper.dltcomplaint(req.params.id).then((response)=>{

    res.redirect('/clgadmin/viewcomplaint')
  })

 })




router.get('/logout',(req,res)=>{

  req.session.destroy()
  res.redirect('/clgadmin/login')
})

module.exports = router;
