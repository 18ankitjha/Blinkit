const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    title: {
        type:String,
        default:"Untitled"
    },
    url:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    user:{

    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Image',ImageSchema);