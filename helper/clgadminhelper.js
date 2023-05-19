var db=require('../config/connection')
const collections = require('../config/collections')
const { response } = require('express')
var objectid=require('mongodb').ObjectId



module.exports={

addstudent:(studdata)=>{


  return new Promise((resolve, reject) => {
    db.get().collection(collections.ADD_STUDENT).insertOne(studdata).then((data)=>{
        resolve(data)
    })
  })
},

show_details_clgadmin:()=>{
  return new Promise(async(resolve, reject) => {
    await db.get().collection(collections.FORM_SUBMIT_COLLECTION).find().toArray().then((product)=>{
      
      resolve(product)
    })
    
  })
},

approve_form:(details)=>{
console.log(details);
  return new Promise((resolve, reject) => {
    
    db.get().collection(collections.FORM_SUBMIT_COLLECTION).updateOne({_id:objectid(details.id)},{
      $set:{'formdata.clgadminaprove':"a",remarks:details.remark,'formdata.statuss':'applied'},
      $currentDate:{approveddate:{$type:'date'}}
    }).then((response)=>{
      resolve(response)
    })
  })
},

rejectform:(details)=>{
  return new Promise((resolve, reject) => {
    db.get().collection(collections.FORM_SUBMIT_COLLECTION).updateOne({_id:objectid(details.id)},{
      $set:{'formdata.clgadminaprove':"r",remarks:details.remark},
      $currentDate:{rejecteddate:{$type:'date'}}
    }).then((response)=>{
      resolve(response)
    })
  })

},

rejectccform:(details)=>{
  return new Promise((resolve, reject) => {

    db.get().collection(collections.COURSE_CERTIFICATE).updateOne({_id:objectid(details.id)},{
      $set:{'dataa.ccaprove':"r",remarks:details.remark},
      $currentDate:{rejecteddate:{$type:'date'}}
    }).then((response)=>{
      resolve(response)
    })
    
  })

},

approveccform:(details)=>{
  return new Promise((resolve, reject) => {
    db.get().collection(collections.COURSE_CERTIFICATE).updateOne({_id:objectid(details.id)},
      {
      $set:{"dataa.ccaprove":"a",
            remarks:details.remark,
            'dataa.statuss':'applied'
    },
    $currentDate:{approveddate:{$type:'date'}}
      

  }
    ).then((response)=>{
      resolve(response)
    })
  })

},


viewccappli:()=>{
  return new Promise(async(resolve, reject) => {
    await db.get().collection(collections.COURSE_CERTIFICATE).find().toArray().then((product)=>{
      
      resolve(product)
    })
    
  })
},

login:(details)=>{

  return new Promise(async(resolve, reject) => {
     await db.get().collection(collections.CLGADMIN).findOne({user:details.clgadminid}).then((response)=>{

      if(details.password==response.password){
        resolve({status:true,user:response})
      }
     })
  })
},

preview:(id)=>{

  return new Promise(async(resolve, reject) => {

    await db.get().collection(collections.FORM_SUBMIT_COLLECTION).findOne({_id:objectid(id)}).then((response)=>{
      resolve(response)
    })
    
  })
},

previewcc:(id)=>{

  return new Promise(async(resolve, reject) => {

    await db.get().collection(collections.COURSE_CERTIFICATE).findOne({_id:objectid(id)}).then((response)=>{

      resolve(response)
    })
    
  })
},

getcomplaint:()=>{

  return new Promise(async(resolve, reject) => {

    await db.get().collection(collections.COMPLAINT).find().toArray().then((response)=>{
      resolve(response)
    })
    
  })
},

dltcomplaint:(idd)=>{

  return new Promise((resolve, reject) => {
    db.get().collection(collections.COMPLAINT).deleteOne({id:idd}).then((response)=>{
      resolve(response)
    })
  })
}


}