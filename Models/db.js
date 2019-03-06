/*const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/gemba_DB',{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDB Conection Succeeded')}
    else {console.log('Error in DB connection'+err)}
});
require('./hallazgo.model');*/
var dbConfig={
    server:"ec2-3-17-4-67.us-east-2.compute.amazonaws.com",
    user:"david",
    password:"david-6393",
    database:"db1",
    port:1433,
    option:{
        encrypt:false
    }
};

module.exports=dbConfig;


