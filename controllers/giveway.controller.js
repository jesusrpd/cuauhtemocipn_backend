import GivaweyModel from "../models/givawey.model.js";
import config from "../utils/config.js";
import AWS from 'aws-sdk';
import TicketModel from '../models/ticket.model.js';
import sharp from 'sharp';
import fs from 'fs'

const getGiveways = async (req, res) => {
    const giveways = await GivaweyModel.find();
    res.status(200).json({success: true, data: giveways});
}

const createGiveway = async (req, res) => {
    const {title, total_tickets, awards, bases, expiration_date, user_id, cost_for_ticket} = req.body;

    // Almacenamos primero las img de los awards
    const s3 = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION
    });
    try {
        const awards_upload = await Promise.all(awards.map( async award => {
    
            const base64Image = award.img;
            const imgBuffer = Buffer.from(base64Image, "base64");
    
            const params = {
                Bucket: "img-awards",
                Key: `${award.name}_${award.model}.jpeg`,
                Body: imgBuffer,
                ContentType: 'image/jpeg'
            }
            const data = await s3.upload(params).promise();
            return {...award, img: data.Location};
    
        }))
        const new_giveway = new GivaweyModel({title, total_tickets, bases, expiration_date, user_id, awards: awards_upload, cost_for_ticket});
        await new_giveway.save();
        res.status(201).json({success: true, data: new_giveway});
        
    } catch (error) {
        console.error("Error al subir imágenes a Amazon S3", error);
        res.status(500).json({ success: false, error: "Ocurrió un error al subir las imágenes" });
    }
}

const getGivewayOnly = async (req, res) => {
    const giveway = await GivaweyModel.findOne({_id: req.params.id});

    if(!giveway) res.status(404).json({success: false, data: "Rifa no encontrada"});
    // const s3 = new AWS.S3({
    //     accessKeyId: config.ACCESS_KEY_ID,
    //     secretAccessKey: config.SECRET_ACCESS_KEY,
    //     region: config.REGION
    // });
    try {
        // const imgs_awards = await Promise.all(giveway.awards.map( async award => {
        //     const params = {
        //         Bucket: "img-awards",
        //         Key: `${award.name}_${award.model}.jpeg`,
        //     }
        //     const imgAward = await s3.getObject(params).promise();
        //     const imgBase64 = imgAward.Body.toString("base64");
        //     return{
        //         name: award.name,
        //         model: award.model,
        //         img:`data:image/png;base64,${imgBase64}`
        //     }
        // }))
        const tickets = await TicketModel.find({giveway_id: giveway._id});
        let numbers_tickets = []
        tickets.map( t => numbers_tickets = numbers_tickets.concat(t.numbers))
        const giveway_with_imgs = {
            title: giveway.title,
            total_tickets: giveway.total_tickets,
            expiration_date: giveway.expiration_date,
            bases: giveway.bases,
            awards: giveway.awards,
            cost_for_ticket: giveway.cost_for_ticket,
            purchased_tickets: numbers_tickets
        }
        res.status(200).json({success: true, data: giveway_with_imgs});
    } catch (error) {
        console.error("Error al obtener las imgadenes de Amazon S3", error);
        res.status(500).json({ success: false, error: "Ocurrió un error al subir las imágenes" });
    }
}

const getAwards = async (req, res) => {
    console.log(req.body);
    const s3 = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION
    });
    const imgs_awards = await Promise.all(req.body.awards.map( async award => {
        const params = {
            Bucket: "img-awards",
            Key: `${award.name}_${award.model}.jpeg`,
        }
        const imgAward = await s3.getObject(params).promise();
        // const imgBase64 = imgAward.Body.toString("base64");
        console.log(imgAward.Body);
    }))
    res.status(200).json({success: true, data: "se obtuvo todo"});
}

export default {getGiveways, createGiveway, getGivewayOnly, getAwards }