const express=require('express');
const sql = require('seriate')
const _ =require('underscore')
var router=express.Router();


var fs = require('file-system');

var dbConfig=require('../Models/db');
var Hallazgo=require('../Models/hallazgo.model');

sql.setDefaultConfig(dbConfig)

router.get('/',(req,res)=>{
    get_data(res);
});

router.post('/',(req,res)=>{
    insert_data(req,res);
});





async function insert_data(req,res){
   console.log("Entra insert");
    var nombre=makeid();
    
    var imagen_normal=req.body.archivo;
    var imagen_mini=req.body.archivo_mini;

    imagen_normal = imagen_normal.split(';base64,').pop();
    imagen_mini = imagen_mini.split(';base64,').pop();
        let ID =req.body.gemba_walkID;
       

        try {
            await insertar_registro_evidencia(req,res,nombre,ID,function(respuesta){
               console.log("Regresa Ejecucion",respuesta);
               fs.writeFile('X:/Data/copamex/gemba_walk/file_'+nombre+'.png', imagen_normal, {encoding: 'base64'}, function(err) {
                    console.log("FILE",err)
                    fs.writeFile('X:/Data/copamex/gemba_walk/mini_'+nombre+'.png', imagen_mini, {encoding: 'base64'}, function(err) {
                        console.log("MINI",err)
                        res.status(200).send(true)
                   });
               }); 
            });
        } catch(e) {
            console.log("error Evidencia",e); // 30
            res.status(500)
        }

}
  function insertar_registro_evidencia(req,res,nombre,ID,callback){
    
    console.log("THIS IS MY BODY",ID);
    let cmd = {
        query: sql.fromFile("./sql/evidencia_INSERT"),
        params: {}
    }
    cmd.params.gemba_walkID={
        type: sql.VARCHAR,
        val: ID
    }
    let file=nombre+'.png'
    cmd.params.archivo={
        type: sql.VARCHAR,
        val: file
    }
   

    // _.each(req.body,function(value,key){
    //     cmd.params[key]={
    //         type: sql.VARCHAR,
    //         val: value
    //     }
    // }) 

    sql.execute(cmd).then( function( result ) {  
        callback(true)
    }, function( err ) {        
        callback(false)
        console.log("ERROR",err)
    } )    
  }

function get_data(res){
    sql.connect(dbConfig).then(() => {
        return sql.query`select * from gemba_walk_evidencia `
    }).then(result => {
        
        res.send(result);
        sql.close();
    }).catch(err => {
        // ... error checks
        sql.close();
    })
     
    sql.on('error', err => {
        // ... error handler
        sql.close();
    })
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 46; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
module.exports=router;