const crafts = require("../models/craftModel")

// add-crafts 
exports.addCraftController =async (req,res)=>{
    console.log("inside addCraftcontroller");
    const userId =req.userId
    console.log(userId);
    const {title,materials,description,link,category}=req.body
    const image = req.file.filename
    console.log(title,materials,description,link,category,image);
    
    try{
       const existingCraft = await crafts.findOne({link})
       if(existingCraft){
          res.status(406).json("craft already exist in our collection..Please upload another one")

       }else{
        const newCraft = new crafts({
            title,materials,description,link,category,image,userId
        })
        await newCraft.save()
        res.status(200).json(newCraft)
       }
    }catch(err){
        res.status(401).json(err)
    }

    
}
// get home crafts - no need authorisation
exports.homePageCraftController = async (req,res)=>{
    console.log("inside homePageCraftController");
    
    try{
       const allHomeCrafts = await crafts.find().limit(3).populate("userId", "username profilePic")

    res.status(200).json(allHomeCrafts)
    }catch(err){
        res.status(401).json(err)
    }

    
}

// get all crafts - need authorisation
exports.allCraftController = async (req,res)=>{
    const searchkey = req.query.search || "";

    console.log(searchkey);
    
    console.log("allCraftController");
    const query= {
        title:{
            $regex:searchkey,$options:'i'
        }
    }
    try{
       const allCrafts = await crafts.find(query).populate("userId", "username profilePic");
    res.status(200).json(allCrafts)
    }catch(err){
        res.status(401).json(err)
    }
}

// get usercrafts - need authorisation
exports.userCraftController = async (req,res)=>{
    
    
    console.log(" inside userCraftController");

    const userId = req.userId
    
    try{
       const alluserCrafts = await crafts.find({userId});
    res.status(200).json(alluserCrafts)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit usercrafts - need authorisation
exports.editCraftController = async (req,res)=>{
    
    
    console.log(" inside editCraftController");
    const id = req.params.id
    const userId= req.userId
    const {title,materials,description,link,category,image} = req.body
    const reUploadImage = req.file? req.file.filename : image
    try{
      const updateCraft = await crafts.findByIdAndUpdate({_id:id},{title,materials,description,link,category,image:reUploadImage,userId},{new:true})
      await updateCraft.save()
      res.status(200).json(updateCraft)  


    }catch(err){
        res.status(401).json(err)
    }
}

// removeProject - need authorisation
exports.removeCraftController= async (req,res)=>{
    console.log("removeCraftController");
    const {id} = req.params
    try{
        const deleteCraft = await crafts.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCraft)
    }catch(err){
        res.status(401).json(err)
    }
    
}


