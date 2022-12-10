const express = require("express");
const jwt = require("jsonwebtoken");
const {validateUser , User} = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Email, validateEmail } = require("../models/emailSchema");
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const upload = require('../middlewares/upload')
const fs = require('fs')

// Registration API
router.post("/", async (req, res) => {
  try { 
  // Validate req
  const {error} = validateUser(req.body)
  if(error) 
    return res.status(400).send(error.details[0].message)
  // Check if this user already exisits
  let userExists = await User.findOne({email: req.body.email})
  if(userExists)
    return res.status(409).send({message:'That user already exists!'});
  else {
    console.log(req.body)
    // Insert the new user if they do not exist yet
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    const user = new User({...req.body , password: hashPassword});
    await user.save();
    res.status(201).send({message: 'User created successfully'});
  }
    } catch(err) {
      console.error(err)
      res.status(500).send({message: "Internal server error"})
    }
});

// getUser API

router.post("/getUser", async (req,res) => {
  try {
    const {email , password} = req.body
    let user = await User.findOne({email})
    return res.send({user})
  } catch (err) {
    console.log(err)
  }
})

// get if User Liked the app API
router.get('/isLiked/:email' , async (req,res) => {
  try {
    const email = req.params.email
    const user = await User.findOne({email})
    return res.send({liked: user.liked})
  } catch (err) {
    console.log(err)
  }
})
// Make the user like the app
router.post("/like", async (req,res) => {
  try {
    const {email} = req.body
    let user = await User.findOneAndUpdate({email},{liked: true})
    return res.send({user})
  } catch (err) {
    console.log(err)
  }
})

// deleteUser API

router.post("/deleteUser", async (req,res) => {
  try {
    const {email} = req.body
    await User.findOne({email}).remove();
    return res.send({message: 'User deleted successfully!'})
  } catch (err) {
    console.log(err)
  }
})

// updateUser API

router.post('/updateUser' , async (req,res) => { 
    try {
      const {name,email,password} = req.body;
      if(!password){
        await User.findOneAndUpdate({email} , {
          email,
          name, 
        })
      } else {
        const hashPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({email} , {
          email,
          name, 
          password: hashPassword
        })
      }
      return res.send('User updated successfully!')
    } catch (error) {
        console.log(error)
    }
 })


// getAllLikes API
router.get('/alllikes' , async (req,res) => {
  try {
    const users = await User.find({liked: true})
    return res.send({likes: users.length})
  } catch (err) {
    console.log(err)
  }
})

// sendEmail API

router.post("/contact", async (req,res) => {
  try {
    const {email , message} = req.body
    let user = await User.findOne({email})
    const date = new Date().toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric" }) + ' '  + new Date().toLocaleTimeString()
    console.log(user)
    const validEmail = validateEmail({
      name: user.name,
      email: email,
      message: message,
      avatar: user.avatar || 'default'
    })
    if(!validEmail)
      return res.send({error: 'data entered is wrong'})

    await new Email({
      name: user.name,
      email: email,
      message: message,
      sentAt: date,
      avatar: user.avatar || 'default'
    }).save()
    
    return res.send({name: user.name , email: user.email , sentAt: date })
  } catch (err) {
    console.log(err)
  }
})

// Get Recent Emails API


router.get("/emails/:num", async(req,res) =>{
  const num = req.params.num;
  const emails = await Email.find().sort({ _id: -1 }).limit(num)
  return res.send({emails})
})

// Get All Accounts API

router.get("/accounts", async(req,res) => {
  const users = await User.find()
  return res.send({users})
})

// createNewTable API

router.post('/createTable', async (req, res) => {
  try {
    const { email , date } = req.body;
    const user = await User.findOne({email})
    user.workouts.push({date})
    await user.save()
    return res.send(user)
  } catch (err) {
    console.log(err)
    return res.send(`Error: `,err.message);
  }
});

// get Table API
router.post('/getTable', async (req, res) => {
  try {
    const { email , date } = req.body;
    const user = await User.findOne({email})
    const workout = user.workouts.find(workout => workout.date === date)
    return res.send(workout)
  } catch (err) {
    console.log(err)
    return res.send(`Error: `,err.message);
  }
});

// addRow API
router.post('/addRow', async(req , res) => {
  try {
    const {email , date , exercise} = req.body
    const user = await User.findOne({email})
    const workout = user.workouts.find(workout => workout.date === date)
    workout.rows.push(exercise)
    await user.save()
    return res.send(user)
  } catch (err) {
    return res.status(404).send('Error: ', err.message)
  }
})

// retrieveRow API
router.post('/retrieveRow', async(req , res) => {
  try {
    const {email , date , id} = req.body
    const user = await User.findOne({email})
    const workout = user.workouts.find(workout => workout.date === date)
    const row = workout.rows.find(row => row._id.toString() === id)
    console.log(row)
    return res.send(row)
  } catch (err) {
    return res.status(404).send('Error: ', err.message)
  }
})

// submitRow API
router.put('/submitRow', async(req , res) => {
  try {
    const {email , date , id , editedExer} = req.body
    const user = await User.findOne({email})
    const workout = user.workouts.find(workout => workout.date === date)
    const row = workout.rows.find(row => row._id.toString() === id)
    console.log(row)
    row.set1 = editedExer.set1
    row.set2 = editedExer.set2
    row.set3 = editedExer.set3
    row.set4 = editedExer.set4
    row.rest = editedExer.rest
    row.weight = editedExer.weight
    row.exer = editedExer.exer
    await user.save()
    return res.send(user)
  } catch (err) {
    return res.status(404).send('Error: ', err.message)
  }
})

// deleteRow API
router.delete('/deleteRow', async(req , res) => {
  try {
    const {email , date , id } = req.body
    const user = await User.findOne({email})
    const workout = user.workouts.find(workout => workout.date === date)
    const rowIndex = workout.rows.findIndex(row => row._id.toString() === id)
    workout.rows.splice(rowIndex,1)
    await user.save()
    return res.send(user)
  } catch (err) {
    return res.status(404).send('Error: ', err.message)
  }
})

// get all user's workouts API
router.get('/getAllWorkouts/:email' , async (req,res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({email});
    return res.send({workouts: user?.workouts})
  } catch (error) {
    return res.send({error})
  }
})

// uploadImage API


router.post('/uploadImg', upload.single('avatar') , async (req,res) => {
  try {
    const {filename} = req.file
    const {email} = req.body
    const user = await User.findOne({email})
    user.avatar = filename;
    await user.save()
    return res.send({user})
  } catch (error) {
    return res.send({error})
  } 
})

// getAvatar API

router.get('/getAvatar/:email' , async (req,res) => { 
  try {
    const email = req.params.email
    const user = await User.findOne({email});
    return res.send({avatar: user.avatar})
  } catch (err) {
    return res.send({err})
  }
 })

module.exports = router;
