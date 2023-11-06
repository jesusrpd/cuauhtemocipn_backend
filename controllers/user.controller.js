import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import bcrypt from 'bcryptjs';

const getUsers = async (req, res) => {
    const users = await userModel.find({}, {password: 0});
    res.status(200).json({success: true, data: users});
}

const signup = async (req, res) => {
    const {name, password, email} = req.body;
    const new_user = new userModel({name, password, email});
    new_user.password = await new_user.encryptPassword(new_user.password);
    await new_user.save();
    res.status(201).json({success: true, data: new_user});
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) res.status(400).json({success: false, data: "User not found"});;

    const verify_password = await user.comparePassword(password);
    if(!verify_password) res.status(404).json({success: false, data: "Passowrd incorrect"});

    const token = jwt.sign({id: user._id}, config.SECRET);
    res.status(200).json({success: true, data: {token, user}});
};

export default {getUsers, signup, login}