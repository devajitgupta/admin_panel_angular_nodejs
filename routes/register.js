const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const Role = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const varify = require('./verifyToken');
const verifyToken = require('./verifyToken');
const mongoose =require('mongoose');

//--------------------------------------------------
// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
	  next();
	} else {
	  res.status(401).json({ message: 'Unauthorized' });
	}
  }
  
  // Middleware to check if user is manager or admin
  const isManagerOrAdmin = (req, res, next) => {
	if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) {
	  next();
	} else {
	  res.status(401).json({ message: 'Unauthorized' });
	}
  }
  
  // Middleware to check if user is employee or admin
  const isEmployeeOrAdmin = (req, res, next) => {
	if (req.user && (req.user.role === 'employee' || req.user.role === 'admin')) {
	  next();
	} else {
	  res.status(401).json({ message: 'Unauthorized' });
	}
  }

  // Get all users (only admin and manager can access)
  router.get('/users', isAdmin, async (req, res) => {
	try {
	  const users = await User.find();
	  res.json(users);
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
  });
  
  // Get current user's information (employee or admin can access)
  router.get('/me', isEmployeeOrAdmin, async (req, res) => {
	try {
	  const user = await User.findById(req.user._id);
	  res.json(user);
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
  });
  
  // Get a specific user's information (only admin and manager can access)
  router.get('/users/:id', isManagerOrAdmin, async (req, res) => {
	try {
	  const user = await User.findById(req.params.id);
	  res.json(user);
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
  });
  /*
  // Create a new user (only admin and manager can create)
  app.post('/users', isManagerOrAdmin, async (req, res) => {
	// implementation of user creation
  });
  
  // Update a user (only admin and manager can update)
  app.put('/users/:id', isManagerOrAdmin, async (req, res) => {
	// implementation of user update
  });
  
  // Delete a user (only admin and manager can delete)
  app.delete('/users/:id', isManagerOrAdmin, async (req, res) => {
	// implementation of user deletion
  });
  
*/

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
router.get('/all-users',async (req,res)=>{
	console.log("all users route")
	console.log("all users getting")
	try{
		const users=await User.find();
		res.json(users);
	}catch(error){
		res.json({message:error})
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

router.get('/aa',(re,res)=>{
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


router.post('/role',(req,res)=>{
	console.log()
	const role=new Role({
		user_id:req.body.user_id,
		admin:req.body.admin,
		manager:req.body.manager,
		employee:req.body.employee

	});
	const saveRole=role.save();
	res.send(saveRole);
})
module.exports = router;