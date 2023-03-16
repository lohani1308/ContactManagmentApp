const asyncHandler=require("../models/contactModel");
const Contacts=require("../models/contactModel");

console.log(Contacts.find());

const getContacts=async(req,res)=>{
    const contacts=await Contacts.find();
     res.status(200).json(contacts);
};

const createContact=async(req,res)=>{
    console.log("the request body is ", req.body);
    const { name,email,phone }=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    } 

    const contact=await Contacts.create({
        name,email,phone
    });

     res.status(201).json(contact);
}

const getContact=(req,res)=>{
    res.status(200).json({ message:`Get contact for ${req.params.id}` });
}

const updateContact=(req,res)=>{
    res.status(200).json({ message:`Updated contact for ${req.params.id}` });
}

const deleteContact=(req,res)=>{
    res.status(200).json({ message:`Delete contact for ${req.params.id}` });
}

module.exports= { getContacts,createContact,getContact,updateContact,deleteContact };