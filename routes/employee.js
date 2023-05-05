const express = require('express');
const router = express.Router();
const Employees = require('../models/employee');




router.post('/employees', async (req, res) => {
	const user = new Employees({
		name: req.body.name,
		email: req.body.email,
		salary:req.body.salary,
        designation:req.body.designation
	})
	try {
		const savedUser = await user.save();
		console.log(savedUser)
		res.send(savedUser);

	} catch (error) {
		res.status(400).send(error);

	}
})



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


module.exports = router;