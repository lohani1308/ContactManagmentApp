const getContacts=(req,res)=>{
     res.status(200).json({ message:"Get all contacts" });
}

const createContact=(req,res)=>{
     res.status(200).json({ message:"Create new contact" });
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