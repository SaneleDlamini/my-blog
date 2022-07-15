const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
// const { loginValidation, registerValidation } = require('../validation/validation')

const getUsers = async(req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
      console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json(users);
}

const register = async(req, res) => {

	// const { error } = registerValidation(req.body);
	// if(error) return res.status(400).send(error.details[0].message);
	let user;
	const { name, surname, email, password } = req.body;
	try{
		const hashedPassword = await bcrypt.hash(password, 12);
		 user = new User({
			name,
			surname,
			email,
			posts : [],
			password : hashedPassword
		});
		await user.save();
	}catch(err){
		console.log(err);
	}

	if(!user){
		res.staus(500).json({message : "Unable to register"})
	}
	return res.status(201).json({user})
}

const login = async(req, res) => {


	// const { error } = loginValidation(req.body);
	// if(error) return res.status(400).send(error.details[0].message);
	
    const { email, password } = req.body;
    let currentUser;

    User.findOne({ email: email })
    .then(user => {
      if (!user) {
         res.status(491).json({error : "A user with this email could not be found."});
      }
      currentUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        res.status(401).json({error : "Wrong password"});
      }
      const token = jwt.sign(
        {
          email: currentUser.email,
          userId: currentUser._id
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      res.status(200).json({ userId : currentUser._id, isAdmin : currentUser.isAdmin, token : token });
    })
    .catch(err => {
      console.log(err);
    });
	
}

const updateUser = async(req, res) => {
	const id = req.params.id;
	let user;
	const { name, surname, email, isAdmin } = req.body;

	try{
		user =  await User.findByIdAndUpdate(id, {
			name,
			surname,
			email,
			isAdmin
		});
	}catch(err){
		console.log(err);
	}

	if(!user){
		res.status(403).json({ message : "No user found with this ID" })
	}
	return res.json(200).json({ message : "user updated" })
}

const getUser = async(req, res) => {
	const id = req.params.id;
	let user;

	try{
		user = await User.findById(id);
	}catch(err){
		console.log(err)
	}
	if(!user){
		res.status(500).json({ message : "No user found with this ID" })
	}
	return res.status(200).json(user);

}

const deleteUser = async(req, res) => {
	const id = req.params.id;
	let user;

	try{
		user = await User.findByIdAndRemove(id);
	}catch(err){
		console.log(err)
	}
	if(!user){
		res.status(500).json({ message : "No user found with this ID" })
	}
	return res.status(200).json({ message : "User deleted successfuly" });

}

module.exports = {
	getUsers,
	register,
	login,
	updateUser,
	getUser,
	deleteUser
}