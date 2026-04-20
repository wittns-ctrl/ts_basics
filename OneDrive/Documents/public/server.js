import dotenv from "dotenv"
dotenv.config()
import {fileURLToPath} from "url"
import path from "path"
import express from "express"
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname,"public")))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`)
})