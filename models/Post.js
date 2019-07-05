const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        required : false
    },
    location : {
        type : String,
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    },
    media : {
        type : String,
        required : true
    },
    comment: [{ 
        text : String,
        postedBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Profile'
        }
    }],
    tag : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
    }]
});

module.exports = Post = mongoose.model('posts', PostSchema);