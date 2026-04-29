import express from 'express'

const app = express()

app.get("/",(req,res)=>{
    res.send("server running just fine");
})

export default app;