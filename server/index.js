const express = require("express")
const MongoConnect = require('./DBConnect/DBconnection')
const auth = require('./Routes/auth')
const cookieParser =require("cookie-parser")
const userFunc = require('./Routes/user')
const posts = require("./Routes/post")
const comments = require("./Routes/comment")
const app=express();
const cors = require("cors")
const multer = require("multer")
const path = require("path")

//Middleware
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use('/api/auth/',auth)
app.use("/api/user",userFunc)
app.use("/api/post",posts)
app.use("/api/comments",comments)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

const port=process.env.PORT

app.listen(port,()=>{
    console.log("Server started "+port)
    MongoConnect()
})
