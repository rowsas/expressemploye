const express=require('express')
const app=express()
const port=2000;
const employee= require('./empolyee');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/employee', employee);





app.listen(port,() =>{
    console.log(`listening port on ${port}`)
    });



    