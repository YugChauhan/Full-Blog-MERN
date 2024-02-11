const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const CommentModel= mongoose.model("posts",CommentSchema);

module.exports=CommentModel;