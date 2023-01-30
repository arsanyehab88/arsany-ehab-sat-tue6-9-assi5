var cors = require('cors')
const express = require("express")



const mysql = require("mysql2")
const app = express()


const query = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'shipping'
})
app.use(cors())
app.use(express.json())

//getALl

app.get("/products",(req,res)=>{
    query.execute("SELECT * FROM products",(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }else{
            res.json({massage:"success",data})
        }
    })
})

//add

app.post("/AddProducts",(req,res)=>{
    const {name,price,cat,desc}=req.body
    query.execute(`INSERT INTO products ( Name, Price, Category, Description) VALUES ( '${name}', '${price}', '${cat}', '${desc}')`,(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }else{
            res.json({massage:"success",data})
        }
    })
})

//delete

app.delete("/deleteProduct/:id",(req,res)=>{
    const {id}=req.params
    query.execute(`DELETE FROM products WHERE id=${id}`,(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }
        if(data , data.affectedRows == 1){
            res.json({massage:"success",data})
        }else{
            res.json({massage:"Id Not Found"})
        }
    })
})

//update
app.put("/updateProducts/:id",(req,res)=>{
    const {id}=req.params
    const {name,price,cat,desc}=req.body
    query.execute(`UPDATE products SET Name="${name}" , Price=${price} , Category='${cat}' , Description='${desc}' WHERE id=${id} `,(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }
        if(data , data.affectedRows == 1){
            res.json({massage:"success",data})
        }else{
            res.json({massage:"Id Not Found"})
        }
    })
})

// search
app.get("/searchById/:id",(req,res)=>{
    const {id}=req.params
    query.execute(`SELECT * FROM products WHERE id=${id}`,(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }
        if(data.length != 0){
            res.json({massage:"success",data})
        }else{
            res.json({massage:"Id Not Found"})
        }
    })
})

app.delete("/DeleteALL",(req,res)=>{
    query.execute('TRUNCATE products',(err,data)=>{
        if(err){
            res.json({massage:"error",err})
        }else{
            res.json({massage:"success",data})
        }
    })
})

app.listen(3000,()=>{
    console.log("server is runining");
})