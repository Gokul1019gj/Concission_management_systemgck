var db=require('../config/connection')
const collections = require('../config/collections')
const { response } = require('express')
var objectid=require('mongodb').ObjectId


module.exports={



    getdetails:()=>{

        return new Promise(async(resolve, reject) => {
            await db.get().collection(collections.FORM_SUBMIT_COLLECTION).find().toArray().then((response)=>{
                resolve(response)
            })
        })
    },

    aproveksrtc:(details)=>{

        return new Promise((resolve, reject) => {
            db.get().collection(collections.FORM_SUBMIT_COLLECTION).updateOne({_id:objectid(details.id)},{
                $set:{'formdata.ksrtcadminaprove':"a",ksrtcremark:details.ksrtcremark},
                $currentDate:{ksrtcapproveddate:{$type:'date'}}
              }).then((response)=>{
                resolve(response)
              })
        })
    },
    
    rejectksrtc:(details)=>{
        return new Promise((resolve, reject) => {

            db.get().collection(collections.FORM_SUBMIT_COLLECTION).updateOne({_id:objectid(details.id)},{
                $set:{'formdata.ksrtcadminaprove':"r",ksrtcremark:details.ksrtcremark},
                $currentDate:{ksrtcrejecteddate:{$type:'date'}}
              }).then((response)=>{
                resolve(response)
              })
            
        })

    },
    login:(details)=>{

        return new Promise(async(resolve, reject) => {

            await db.get().collection(collections.KSRTCADMIN).findOne({user:details.ksrtcadminid}).then((response)=>{

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
    }
}
