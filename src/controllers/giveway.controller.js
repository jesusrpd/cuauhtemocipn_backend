import GivaweyModel from "../models/givawey.model.js";

const getGiveways = async (req, res) => {
    const giveways = await GivaweyModel.find();
    res.status(200).json({success: true, data: giveways});
}

const createGiveway = async (req, res) => {
    const {title, total_tickets, awards, bases, expiration_date, user_id} = req.body;

    res.status(201).json({success: true, data: "se creo exitosamente"});
}

export default {getGiveways, createGiveway }