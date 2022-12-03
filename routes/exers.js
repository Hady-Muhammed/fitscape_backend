const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Champ } = require("../models/champSchema");
const { User } = require("../models/userSchema");
const { Exer } = require("../models/exerSchema");


// Get all Exercises API
router.get("/", async (req, res) => {
    try {
        const exers = await Exer.find()
        return res.send({exers});
    } catch (error) {
        return res.send({error})
    }
});
// Get an Exercise API
router.get("/getExer/:name", async (req, res) => {
    try {
        const name = req.params.name
        const exer = await Exer.findOne({name})
        return res.send({exer})
    } catch (error) {
        return res.send({error})
    }
});

// deleteExer API
router.post("/deleteExercise" , async (req , res) => {
    try {
        const {name} = req.body
        const user = await Exer.findOne({name}).remove()
        console.log(user)
        return res.send({message: 'deleted successfully!'})
    } catch (err) {
        console.log(err)
    }
})

// addExer API
router.post("/addExercise" , async (req , res) => {
    try {
        const exer = new Exer({
            ...req.body
        })
        await exer.save()
        return res.send({message: 'Exer created successfully!'})
    } catch (err) {
        console.log(err)
    }
})

// updateExer API
router.post('/updateExer/:name' , async (req,res) => {
    try {
        const name = req.params.name;
        const updates = req.body;
        const exer = await Exer.findOneAndUpdate({name} , updates )
        return res.send({exer})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;