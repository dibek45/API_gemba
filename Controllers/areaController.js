const express=require('express');
const sql = require('mssql');
var router=express.Router();
var dbConfig=require('../Models/db');


router.get('/',(req,res)=>{
    sql.close();
    sql.connect(dbConfig).then(() => {
        return sql.query`select * from area `
    }).then(result => { 
        res.send(result.recordsets[0]);
        sql.close();
    }).catch(err => {
        // ... error checks
        sql.close();
    })
     
    sql.on('error', err => {
        // ... error handler
        sql.close();
    })
});
router.get('/:id',(req,res)=>{
    sql.close();
   var id=req.params.id;
    sql.connect(dbConfig).then(() => {
        return sql.query`EXEC SP_area ${id}`
    }).then(result => {
        res.send(result.recordsets[0]);
        sql.close();
    }).catch(err => {
        // ... error checks
        console.log(err);
        sql.close();
    })
     
    sql.on('error', err => {
        // ... error handler
        console.log(err);
        sql.close();
    })
});

router.post('/',(req,res)=>{
   // insert_data(req,res);
});

module.exports=router;