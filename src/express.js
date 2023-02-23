const express=require('express');
const app=express();
const cors = require('cors');
const cookieparser=require('cookie-parser');
const notesRoutes=require('../web-app-backend/routers/notesRoutes')
const errorMiddleware=require('./errorHandling/errorMiddleware')

app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api/v1/note-keeper',notesRoutes);


app.use(errorMiddleware);
module.exports= app
