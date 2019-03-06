const express=require('express')
const sql = require('seriate')
const _ =require('underscore')

var router=express.Router()
var dbConfig=require('../Models/db')

sql.setDefaultConfig(dbConfig)
 
router.post('/',(req,res)=>{      
    let cmd = {
        query: sql.fromFile("./sql/hallazgo_INSERT"),
        params: {}
    }

    _.each(req.body,function(value,key){
        cmd.params[key]={
            type: sql.VARCHAR,
            val: value
        }
    })   

    sql.execute(cmd).then( function( result ) {  
        console.log(result,req.body.hallazgos) 
        res.status(200).send(result[0])
    }, function( err ) {
        console.log("ERROR",err)
        res.status(500)
    } )          
})

module.exports=router