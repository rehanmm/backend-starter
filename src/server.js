const app=require('./express')
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const exitHandler=require('./errorHandling/exitHandler')
dotenv.config()



mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, 
})
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err.stack||error))

process.on('uncaughtException',exitHandler(0,'uncaughtException'))
process.on('SIGTERM', exitHandler(0,'SIGTERM'))
process.on('SIGINT',exitHandler(0, 'SIGTINT'))
process.on('unhandledRejection',exitHandler(0,'unhandledRejection'))    


app.listen(process.env.PORT, function (err) {
    if(err){
        console.log("error while starting server");
        console.log(err.stack||err);

    }
    else{
        console.log("server has been started at port "+process.env.PORT);
    }
})



