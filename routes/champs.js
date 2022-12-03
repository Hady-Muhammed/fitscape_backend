const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Champ } = require("../models/champSchema");
const { User } = require("../models/userSchema");


// Get all Champions API
router.get("/", async (req, res) => {
    try {
        const champs = await Champ.find()
        return res.send({champs});
    } catch (error) {
        return res.send({error})
    }
});
// Get a champion API
router.get("/getChamp/:name", async(req,res) => {
    try {
        const name = req.params.name
        const champ = await Champ.findOne({name})
        return res.send({champ})
    } catch (err) {
        return res.send({err})
    }
})
// deleteChamp API
router.post("/deleteChamp" , async (req , res) => {
    try {
        const {name} = req.body
        const user = await Champ.findOne({name}).remove()
        console.log(user)
        return res.send({message: 'deleted successfully!'})
    } catch (err) {
        console.log(err)
    }
})

// addChamp API
router.post("/addChamp" , async (req , res) => {
    try {
        const champ = new Champ({
            ...req.body
        })
        await champ.save()
        return res.send({message: 'champ created successfully!'})
    } catch (err) {
        console.log(err)
    }
})

// updateChamp API

router.post('/updateChamp/:name' , async (req,res) => {
    try {
        const name = req.params.name;
        const updates = req.body;
        const champ = await Champ.findOneAndUpdate({name} , updates )
        return res.send({champ})
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;