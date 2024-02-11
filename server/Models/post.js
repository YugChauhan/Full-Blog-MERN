const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    categories:{
        type:Array
    },
})

const PostModel = mongoose.model("post",PostSchema);

module.exports=PostModel;