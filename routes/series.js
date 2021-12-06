const express = require('express');
const router = express.Router();
router.use(express.json());

const seriesModel = require("../models/seriesmodel");
const platformModel = require("../models/platformmodel");

//Add Series
router.post("/add", (req,res) => {
    const { newSeries } = req.body;
    const addNewSeries = seriesModel.create(newSeries);
    return res.json({data: "Series Added successfully."});
});

//Fetch all series of a platform
router.get("/list/:platformname", async (req,res) =>{
    const platf = await platformModel.findOne({name: req.params.platformname});
    if(platf){
        const ser = await seriesModel.find({platformid: platf.platformid});
        if(ser){
            return res.json({data: ser});
        }else{
            return res.json({data: "No Series found on " + req.params.platformname + " platform."});
        }
    }
    else{
        return res.json({data: "No Platform named " + req.params.platformname + " exists in the database."});
    }
});

//Fetch all series
router.get("/listall", async (req,res) =>{
    const ser = await seriesModel.find();
        if(ser){
            return res.json({data: ser});
        }else{
            return res.json({data: "No Series found."});
        }
});

//Update Series(add/remove platform)
router.put("/update/:seriesid", async (req,res) =>{
    const updatedSeries = await seriesModel.findOneAndUpdate({seriesid: req.params.seriesid},{platformid: req.body.platformidlist});
    return res.json({data: "Series's platforms updated successfully."});
});

//Delete product
router.delete("/del/:seriesid", async (req,res) =>{
    const delSeries = await seriesModel.findOneAndDelete({seriesid: req.params.seriesid});
    return res.json({data: "Series deleted successfully."});
});

module.exports = router;