const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const varify = require('./verifyToken');
const verifyToken = require('./verifyToken');
const mongoose =require('mongoose');


router.post('/register', async (req, res) => {
	const emailExist = await User.findOne({
		email: req.body.email
	});
	

	if (emailExist) return res.status(400).send("Email id is already exist");

	//-- hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	let role = 'employee';
	if (req.body.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
	  role = 'admin';
	}

	// create a new user

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	
	})
	try {
		const savedUser = await user.save();
		console.log(savedUser)
		res.send(savedUser);

	} catch (error) {
		res.status(400).send(error);

	}
})

// Middleware to parse request body

router.post('/login', async (req, res) => {
	// get the email and password of req.body
	console.log("aa")
	const user = await User.findOne({ email: req.body.email });

	// find the user of requested email
	if (!user) return res.status(402).send("Email Id is wrong");

	// comapre sent in password with found user password

	const passwordMatch = await bcrypt.compare(req.body.password, user.password);
	if (!passwordMatch) return res.status(402).send("password");
	
	//-- create and asign a token
	const Token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", Token).send({ token: Token });
	console.log("login routes working");
});

// get all employee information 



// get single user
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);

	} catch (error) {
		res.json({ message: error });
	}
});

router.put('/:id', async (req, res) => {
	console.log("put response new")

	try {
		const _id = req.params.id;
		const getUser = await User.findOneAndUpdate(_id, req.body, {
			new: true
		});
		res.send(getUser);
		console.log(getUser);
	} catch (e) {
		res.status(400).send(e)

	}
})

//delete
router.delete('/:id', async (req, res) => {
	console.log("delted response from backend")

	try {
		const removeUser = await User.findOneAndRemove(req.params.id);
		res.send(removeUser);
	} catch (error) {
		res.json({ message: error });

	}
});

router.get('/',(re,res)=>{
	console.log("as")
	const userId='645bb8aec74c8bf448715ce9';
	User.findById(userId).exec().then((data)=>{
		res.json({success:true, data:data});
	});
})

router.post('/logout', (req,rs)=>{
	res.token('auth-token');
	res.status(200).json({ message: 'User logged out' });

})

module.exports = router;