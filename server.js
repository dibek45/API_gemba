const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// myEmitter.setMaxListeners(Infinity);
const express=require('express');
const bodyparser=require('body-parser');
var app=express();
var cors = require('cors');
app.use(cors({ origin: '*' }));

const evidenciaController=require('./Controllers/evidencia2Controller');
const eventoController=require('./Controllers/eventoController');
const areaController=require('./Controllers/areaController');
const hallazgoController=require('./Controllers/hallazgo2Controller');
const loginController=require('./Controllers/loginController');

app.use(bodyparser.urlencoded({
    extended:true
}));
var port = process.env.PORT || 81 ;
app.use(bodyparser.json({limit: '5mb'}));

app.listen(port,"0.0.0.0",()=>{
    console.log('Express server started at port :',port);
})

app.use('/evidencia',evidenciaController);
app.use('/evento',eventoController);
app.use('/area',areaController);
app.use('/hallazgo',hallazgoController);
app.use('/login',loginController);
