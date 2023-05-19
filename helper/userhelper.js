var db=require('../config/connection')
const collections = require('../config/collections')
const { response } = require('express')
var objectid=require('mongodb').ObjectId

module.exports={


    formsubmit:(formdata,stud)=>{
        
         let fullformdata={formdata,stud}
         console.log(fullformdata);
        return new Promise((resolve, reject) => {
            db.get().collection(collections.FORM_SUBMIT_COLLECTION).insertOne(fullformdata)
            .then((data)=>{
                console.log(data.insertedId);
                resolve(data.insertedId)
            })
               
            })
        

    },
    
   
    dologin:(data)=>{
        
        global.ress={}
        
        return new Promise(async(resolve, reject) => {
            
            await db.get().collection(collections.ADD_STUDENT).findOne({studid:data.studid}).then((user)=>{
                // console.log(user.firstlogin);
                if(user.firstlogin=='true' && user.password==data.password)
                    {
                        ress.status=1
                        resolve(ress)
                        

                    }else if(user.firstlogin=='false' && user.password==data.password){
                        ress.user=user
                        ress.status=2

                    resolve(ress)
                    }else{
                        ress.status=3
                        resolve(ress)
                    }
            })

            

           
        })


        

        
    },

    changepassword:(password)=>{

        return new Promise((resolve, reject) => {
            console.log(password.password)
            
            db.get().collection(collections.ADD_STUDENT).updateOne({studid:password.studid},{
                $set:{
                    password:password.password,
                    firstlogin:"false"
                }
            }).then((response)=>{
                console.log(response);
                
                resolve(response)
            })
        })
    },

    getstatus:(details)=>{
        let resss={}
        let st=null
        return new Promise(async(resolve, reject) => {
            await db.get().collection(collections.FORM_SUBMIT_COLLECTION).findOne({stud:details}).then((dtt)=>{
                st=dtt.formdata.statuss


                if(st==null){
                    resss.clgaprove="not applied"
                    resss.download=false
                }else{
                if(dtt.formdata.clgadminaprove=='a'&&dtt.formdata.ksrtcadminaprove=="w"){

                    resss.clgaprove="Approved at College level"
                    resss.download=false
                }
                else if(dtt.formdata.clgadminaprove=='w'){
                    resss.clgaprove="processing at college level"
                    resss.download=false
                }
                else if(dtt.formdata.clgadminaprove=='r'){
                    resss.clgaprove="rejected at college level"
                    resss.remarks=dtt.remarks
                    resss.download=false
                }else if(dtt.formdata.clgadminaprove=='w'&&dtt.formdata.ksrtcadminaprove=='w'){
                    resss.clgaprove="processing at college level"
                    resss.download=false
                }else if(dtt.formdata.clgadminaprove=='a'&&dtt.formdata.ksrtcadminaprove=='w'){
                    resss.clgaprove="processing at ksrtc level"
                    resss.download=false
                }else if(dtt.formdata.ksrtcadminaprove=='r'){
                    resss.clgaprove="rejected at ksrtc level"
                    resss.remarks=dtt.ksrtcremark
                    resss.download=false
                }else if(dtt.formdata.ksrtcadminaprove=='a'){
                    resss.clgaprove="approved"
                    resss.download=true

                }
            }
                
                
                
                
                
                

                
            })
            resolve(resss)

        })

    },

    getccstatus:(details)=>{
        let st=null
        let resss={}
         return new Promise(async(resolve, reject) => {
            await db.get().collection(collections.COURSE_CERTIFICATE).findOne({id:details}).then((dtt)=>{
            st=dtt.dataa.statuss
            if(st==null){
                resss.clgaprove="not applied"
                    resss.download=false

            }else{
                
                
                
                
                if(dtt.dataa.ccaprove=='a'){
                    resss.clgaprove='approved'
                    resss.download=true
                }else if(dtt.dataa.ccaprove=='w'){
                    resss.clgaprove="processing"
                    resss.download=false

                }else{
                    resss.clgaprove='rejected'
                    resss.download=false
                    resss.remark=dtt.remarks
                }
            }
            
            })
            resolve(resss)
         })
        
        

    },


    coursecertificatedata:(dataa,id)=>{
        let data={dataa,id}

        return new Promise((resolve, reject) => {
            db.get().collection(collections.COURSE_CERTIFICATE).insertOne(data).then((response)=>{

                resolve(response)
            })
        })



    },
    vconcession:(id)=>{

        return new Promise(async(resolve, reject) => {
            
           await db.get().collection(collections.FORM_SUBMIT_COLLECTION).findOne({stud:id}).then((response)=>{
            resolve(response)
           })
        })
    },


    vcc:(id)=>{

        return new Promise(async(resolve, reject) => {
            
           await db.get().collection(collections.COURSE_CERTIFICATE).findOne({id:id}).then((response)=>{
            resolve(response)
           })
        })
    },

    rgstrcmplt:(id,details)=>{

        let complaint={id,details}

        return new Promise((resolve, reject) => {
            db.get().collection(collections.COMPLAINT).insertOne(complaint).then((response)=>{
                resolve(response)
            })
        })
    }






}