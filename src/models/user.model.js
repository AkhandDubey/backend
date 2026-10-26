import mongoose,{Schema} from 'mongoose'
import jsw from 'jsonwebtoken'
const userSchema=new Schema({
    user:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    fullName:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    avatar:{
        type:String,//cloudnary
        required:true,
    },
    coverImage:{
        type:String//cloudnary
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshTokens:{
        required:true
    }
},{timestamps:true});

userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect=async function(){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessTokens= function(){
    return jsw.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIREY
    }
}
userSchema.methods.generateRefreshTokens= function(){
    return jsw.sign({
        _id:this.id,
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIREY
    }
}
export const User=mongoose.model("User",userSchema);