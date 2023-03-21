const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
    const { username,email,password }=req.body;
    //to check all fields are filled 
    if(!email || !username || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    //To check is given email registered previously
    const userAvailable=await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    //Hash Password
    const hashedPassword=await bcrypt.hash(password, 10);
    console.log("Hashed Password: ",hashedPassword);

    //filling data into database
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({ _id:user.id, email:user.email });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({ message: "Register the User" });
}

const loginUser=async(req,res)=>{
    const { email,password }=req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const user=await User.findOne({ email });
    //console.log(user);
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1d" }
        )
        res.status(200).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
}

const currentUser=async(req,res)=>{
    res.json(req.user)
}

module.exports={ registerUser,loginUser,currentUser }

// {
//     "username":"lohani",
//     "email":"alohani1308@gmail.com",
//     "password":"1234567890"

// }