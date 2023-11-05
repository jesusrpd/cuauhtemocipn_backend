import GivaweyModel from "../models/givawey.model.js";
import config from "../utils/config.js";
import AWS from 'aws-sdk';

const getGiveways = async (req, res) => {
    const giveways = await GivaweyModel.find();
    res.status(200).json({success: true, data: giveways});
}

const createGiveway = async (req, res) => {
    const {title, total_tickets, awards, bases, expiration_date, user_id} = req.body;

    // Almacenamos primero las img de los awards
    const s3 = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION
    });
    try {
        const awards_upload = await Promise.all(awards.map( async award => {
    
            const base64Image = award.img;
            const imgaeBuffer = Buffer.from(base64Image, "base64");
    
            const params = {
                Bucket: "img-awards",
                Key: `${award.name}_${award.model}`,
                Body: imgaeBuffer,
                ContentType: "image/jpeg",
            }
            const data = await s3.upload(params).promise();
            return {...award, img: data.Location};
    
        }))
        const new_giveway = new GivaweyModel({title, total_tickets, bases, expiration_date, user_id, awards: awards_upload});
        await new_giveway.save();
        res.status(201).json({success: true, data: new_giveway});
        
    } catch (error) {
        console.error("Error al subir imágenes a Amazon S3", error);
        res.status(500).json({ success: false, error: "Ocurrió un error al subir las imágenes" });
    }
}

export default {getGiveways, createGiveway }