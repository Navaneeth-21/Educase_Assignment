const joi = require('joi');

const validateCreateSchool = (data)=>{
    const schema = joi.object({
        Name: joi.string().min(3).max(100).required(),
        address: joi.string().min(10).max(200).required(),
        latitude: joi.number().required(),
        longitude: joi.number().required()
    });
    
    return schema.validate(data);
};

module.exports = validateCreateSchool;