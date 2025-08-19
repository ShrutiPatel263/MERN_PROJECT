const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

   name:{
      type: String,
      required:true,
      minlength:[3, 'Name must be at least 3 characters long']
   },
    email:{
        type: String,
        required:true,
        unique:true,
        match: [/^[^\s@]+@vgecg\.ac\.in$/, 'Please enter a valid vgecg.ac.in email'] // valid for vgecg.ac.in email
  },
    password:{
        type: String,
        required:true,
        minlength:[6, 'Password must be at least 6 characters long']
    },
    userName:{
        type: String,
        required:true,
        unique:true,
        minlength:[3, 'Username must be at least 3 characters long']
    },
    branch:{
        type: String,
        required:true,
        enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'], // Example branches
    }

}, {timestamps: true});

//Middleware to save password in hash
userSchema.pre("save",async function (next) {
     
    if(!this.isModified("password")){ //To avoid store password every time
       return next();
    }

    this.password=await bcrypt.hash(this.password,10)
    next()
})

//Methods to check password

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}

//Generate tokens

userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    ) 
}
userSchema.methods.generateRefreshToken=function(){
       return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema);