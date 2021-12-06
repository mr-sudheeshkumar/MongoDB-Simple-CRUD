const express = require('express');
const router = express.Router();
router.use(express.json());

const seriesModel = require("../models/seriesmodel");
const platformModel = require("../models/platformmodel");

//Add Platform
router.post("/add", (req,res) =>{
    const {newPlatform} = req.body;
    const addNewComp = platformModel.create(newPlatform);
    return res.json({data: "Platform Added successfully."});
});

//Fetching platform details based on series name
router.get("/list/:seriesname", async (req,res) =>{
    const series = await seriesModel.findOne({title: req.params.seriesname});
    const platfid = series.platformid;
    const platf = await platformModel.findOne({platformid: platfid});
    if(platf){
        return res.json({data: "Platform Details :  " + "Platform ID : " + platf.platformid + " Platform Name : " + platf.title});
    }else{
        return res.json({data: "No details Found."});
    }
});

//Update Platform(rename platform)
router.put("/update/:platformid", async (req,res) =>{
    const updatedPlatform = await platformModel.findOneAndUpdate({platformid: req.params.platformid},{title: req.body.platformname});
    return res.json({data: "Platform's Name Updated successfully."});
});

//Delete Platform
router.delete("/del/:platformid", async (req,res) =>{
    const delPlatform = await platformModel.findOneAndDelete({platformid: req.params.platformid});
    return res.json({data: "Platform deleted successfully."});
});

module.exports = router;