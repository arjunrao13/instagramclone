const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      
    bio : {
        type : String,
        required: false
    },
    story : {
        type : String,
        required : false
    },
    
    followers : [{

        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
        
    }],
    following : [{

        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    
    }],
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'posts'
    }]
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);