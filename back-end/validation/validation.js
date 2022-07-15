const joi = require('@hapi/joi');

 const registerValidation = data => {
	const schema = {
		name : joi.string().min(3).max(20).required(),
		surname : joi.string().min(3).max(20).required(),
		email : joi.string().required().email(),
		password : joi.string().min(3).max(100),
	};
	return joi.validate(data, schema);
};

 const loginValidation = data => {
	const schema = {
		email : joi.string().required().email(),
		password : joi.string().min(3).max(100),
	};
	return joi.validate(data, schema);
};

 const postValidation = data => {
	const schema = {
		title : joi.string().required(),
		content : joi.string().required(),
		image : joi.string().required()
	};
	return joi.validate(data, schema);
};

module.exports = {
	registerValidation,
	loginValidation,
	postValidation
}