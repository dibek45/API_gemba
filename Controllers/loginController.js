
const express=require('express');
var router=express.Router();
var ActiveDirectory = require('activedirectory');
const sql = require('mssql');
var dbConfig=require('../Models/db');

router.get('/:user/:pass',(req,res)=>{
    autentificate(req.params.user,req.params.pass,res);
})

var config = {
    url: 'ldap://10.11.1.14',
    baseDN: 'dc=domain,dc=com'
};
var attributes= {
    user: [ ]
}

function autentificate(username,password,res){
    var ad = new ActiveDirectory(config,attributes);
   
    // Authenticate
    ad.authenticate(username+'@cpx', password, function(err, auth) {
        if (err) {
          console.log('ERROR: '+JSON.stringify(err));
          return;
        }

        if (auth) {
          console.log('Authenticated!'+JSON.stringify(auth));
          get_data_user(username.toString(),res);
        }
        else {
          console.log('Authentication failed!');
        }
      });
}

function get_data_user(usuario,res){
  sql.close();
    sql.connect(dbConfig).then(() => {
        return sql.query`SELECT usuarioID, empresaID from _usuario WHERE usuario=${usuario}`
    }).then(result => {
        console.log(JSON.stringify(result.recordset[0]));
        res.send(result.recordset);
        sql.close();
    }).catch(err => {
        //... error checks
        console.log(err);
        sql.close();
    })
     
    sql.on('error', err => {
        // ... error handler
        sql.close();
    })
}
module.exports=router;