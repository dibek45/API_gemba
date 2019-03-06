const express=require('express');
const sql = require('mssql');

var router=express.Router();
var dbConfig=require('../Models/db');


router.get('/',(req,res)=>{
    sql.close();
    sql.connect(dbConfig).then(() => {
        return sql.query`EXEC SP_evento`
    }).then(result => {
        
        res.send(result.recordsets[0]);
        sql.close();
    }).catch(err => {
        // ... error checks
    })
     
    sql.on('error', err => {
        // ... error handler
        sql.close();
    })
});
router.get('/:id',(req,res)=>{
   
   var id=req.params.id;
   sql.close();
    sql.connect(dbConfig).then(() => {
        return sql.query`select * from eventos_areas_vista WHERE empresaID=${id}`
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

router.post('/',(req,res)=>{
    insert_data(req,res);
});

//PUT API
router.put("/:id", function(req , res){
   
    sql.connect(dbConfig).then(() => {
        return sql.query`UPDATE gemba_walk_evidencia SET gemba_walkID=${req.body.gemba_walkID} , archivo= ${req.body.archivo}, tipo= ${req.body.tipo}  WHERE gemba_walk_evidenciaID= ${req.params.id}`
        }).then(result => {

            res.json(result);
            sql.close();
        }).catch(err => {
            console.log(err);
            // ... error checks
        })
        sql.on('error', err => {
            console.log("3")
            // ... error handler
        });
});

//PUT DELETE
router.delete("/:id", function(req , res){
   
    sql.connect(dbConfig).then(() => {
        return sql.query`DELETE FROM gemba_walk_evidencia WHERE gemba_walk_evidenciaID= ${req.params.id}`
        }).then(result => {
            res.json(result);
            sql.close();
        }).catch(err => {
            console.log(err);
            // ... error checks
        })
        sql.on('error', err => {
            console.log("3")
            // ... error handler
        });
});

function insert_data(req,res){

        sql.connect(dbConfig).then(() => {
            return sql.query`INSERT INTO gemba_walk_evidencia (gemba_walkID,archivo,tipo) values (${req.body.gemba_walkID},${req.body.archivo},${req.body.tipo})`
            }).then(result => {

                res.json(result);
                sql.close();
            }).catch(err => {
                console.log(err);
                // ... error checks
            })
            sql.on('error', err => {
                console.log("3")
                // ... error handler
            });
}



module.exports=router;