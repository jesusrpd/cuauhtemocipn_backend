import userModel from '../models/user.model.js';

const getUsers = async (req, res) => {
    const users = await userModel.find();
    res.status(200).json({success: true, message: users});
}

export default {getUsers}