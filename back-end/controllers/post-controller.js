const Post = require('../models/post-model');
const User = require('../models/user-model');
const deleteFile = require('../middleware/files');
// const { postValidation } = require('../validation/validation')


const getPosts = async(req, res) => {
	let posts;

	const PAGE_SIZE = 3;
	const page = parseInt(req.query.page || "0");
	const total = await Post.countDocuments({})
    
	try{
 		posts = await Post.find().populate('creater').
	     limit(PAGE_SIZE).skip(PAGE_SIZE * page);
	}catch(err){
		console.log(err);
	}
	if(!posts){
		res.json({ message : "No post found" })
	}

	return res.status(200).json({totalPages : Math.ceil(total / PAGE_SIZE), posts})
}

const getAllPost = async(req, res) => {
	let posts;

	try{
 		posts = await Post.find();
	}catch(err){
		console.log(err);
	}
	if(!posts){
		res.json({ message : "No post found" })
	}

	return res.status(200).json({ posts })
}

const createPost = async(req, res) => {

	// const { error } = postValidation(req.body);
	// if(error) return res.status(400).send(error.details[0].message);

	let post;
	let user;

	try{
	   user = await User.findById(req.user.userId);
	}catch(err){
		console.log(err);
	}

	try{
		post = new Post({
			title : req.body.title,
			content : req.body.content,
			image : req.file.originalname,
			creater : req.user.userId
		});

		await post.save();
		creater = user;
		await user.posts.push(post);
		await user.save();

		//if(user){
			//return res.status(200).json({ name:user.name, surname:user.surname })
		//}

	}catch(err){
		console.log(err);
	}

	if(!post){
		res.status(500).json({ message : "Unable to create a post" })
	}
	return res.status(200).json({ message : "post created successfully" })
}

const updatePost = async(req, res) => {
	const id = req.params.id;
	let post;
	const { title, content } = req.body;
	const image = req.file.originalname;

	try{
		post =  await Post.findByIdAndUpdate(id, {
			title,
			content,
			image
		});
	}catch(err){
		console.log(err);
	}

	if(!post){
		res.status(403).json({ message : "No post found with this ID" })
	}
	return res.json(200).json({ message : "post updated successfully" })
}

const getPost = async(req, res) => {
	const id = req.params.id;
	let post;

	try{
		post = await Post.findById(id).populate('creater');
	}catch(err){
		console.log(err)
	}
	if(!post){
		res.status(500).json({ message : "No post found with this ID" })
	}
	return res.status(200).json( post );
}

const getMyPosts = async(req, res) => {
	let myPosts;

	const PAGE_SIZE = 3;
	const page = parseInt(req.query.page || "0");
	const total = await Post.countDocuments({})
    
	try{
		myPosts = await Post.find({creater:req.user.userId}).populate('creater').
		limit(PAGE_SIZE).skip(PAGE_SIZE * page);
	}catch(err){
		console.log(err)
	}
	if(!myPosts){
		res.status(500).json({ message : "You do not have posts yet!" })
	}
	return res.status(200).json({totalPages : Math.ceil(total / PAGE_SIZE), myPosts});

}

const deletePost = async(req, res) => {
	const id = req.params.id;
	let post;
	let user;

	try{
	   user = await User.findById(req.user.userId);
	}catch(err){
		console.log(err);
	}

	try{
		post = await Post.findByIdAndRemove(id).populate('creater');
		await post.creater.posts.pull(post);
		await post.creater.save();
	}catch(err){
		console.log(err)
	}
	if(!post){
		res.status(500).json({ message : "No found found with this ID" })
	}
	return res.status(200).json({ message : "post deleted successfuly" });

}

module.exports = {
	getPosts,
	getAllPost,
	createPost,
	updatePost,
	getMyPosts,
	getPost,
	deletePost
}




