const router= require("express").Router();
const Post = require("../models/post")

router.post("/create/:id",async (req,res)=>{
    try 
    {
        if(req.params.id === req.body.user)
        {
            const newpost = await new Post(req.body);
            const save=await newpost.save();
            res.status(200).json(save);
        }   
        else
        {
            res.json("You cann;t post for other user");
        }
    } 
    catch (error) {
        res.status(500).json(error);
    }
});

router.put("/edit/:id",async (req,res)=>{
    try 
    {   
        const post = await Post.findById(req.params.id);
        if(post.user === req.body.userID)
        {
            await post.updateOne({$set:req.body});
            res.status(200).json("Post Updated");
        }
        else
        {
            res.json("You cann;t post for other user");
        }   
    } 
    catch (error) {
        res.status(500).json(error);
    }
});
router.delete("/delete/:id",async (req,res)=>{
    try 
    {   
        const post = await Post.findById(req.params.id);
        if(post.user === req.body.userID)
        {
            await post.delete();
            res.status(200).json("Post deleted");
        }
        else
        {
            res.json("You can only delete your post");
        }   
    } 
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router