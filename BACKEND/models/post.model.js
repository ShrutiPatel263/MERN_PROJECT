const mongoose = require('mongoose');

const postschema= new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    companyName:{
        type: String,
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    },
    topicsCovered:{
        type: [String],
        required: true,
    },
    interviewType:{
        type: String,
        required: true,
    },
    roundDetails:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    tips:{
        type: String,
        required: true,
    },
    materialLinks:{
        type: [String],
    },
    difficultyLevel:{
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'], 
    },
    results:{
        type:String,
    }
},{timestamps: true});

export const Post = mongoose.model("Post", postschema);