const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        required: false
    },
    story : {
        type : String,
        required : false
    },
    avatar : {
        type : String,
        required : false
    },
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
    }],
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);