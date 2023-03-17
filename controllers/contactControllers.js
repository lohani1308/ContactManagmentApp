const asyncHandler=require("../models/contactModel");
const Contacts=require("../models/contactModel");
;

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

const getContact=async(req,res)=>{
    const contact=await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
}

const updateContact=async(req,res)=>{
    const contact=await Contacts.findById(req.params.id);
    //console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatecontact=await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );

    res.status(200).json(updateContact);
}

const deleteContact=async(req,res)=>{
    const contact=await Contacts.findById(req.params.id);
    
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
     }

    await Contacts.deleteOne({ "_id":req.params.id});
    res.status(200).json(contact);
}

module.exports= { getContacts,createContact,getContact,updateContact,deleteContact };

// {
//     "name":"Akash",
//     "email":"akash1308@gmail.com",
//     "phone":"8650221886"
// }