import TicketModel from '../models/ticket.model.js';
import config from "../utils/config.js";
import AWS from 'aws-sdk';
import fs from 'fs';
import qr from 'qrcode';
import jwt from 'jsonwebtoken';
import xlsx from 'xlsx';

const getTicketsByGiveway = async (req, res) => {
    
    const tickets = await TicketModel.find({giveway_id: req.params.id_giveway});

    res.status(200).json({success: true, data: tickets});
} 


const buyTicket = async (req, res) => {
    const numbers_array = req.body.numbers.split(",").map(Number);
    const ticket_data = {
        ...req.body,
        numbers: numbers_array
    }
    const new_ticket = new TicketModel(ticket_data);
    await new_ticket.save();

    const s3 = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION
    });
    try {
        const imgStream = fs.createReadStream(req.file.path)
        const params = {
            Bucket: "payments-photo",
            Key: `${new_ticket._id}.jpg`,
            Body: imgStream,
        }
        const submit = await s3.upload(params).promise();
        new_ticket.payment_photo = submit.Location
        await new_ticket.save();
        res.status(201).json({success: true, data: new_ticket});
    } catch (error) {
        res.status(500).json({success: false, data: error})
    }
}

const renderTickets = async (req, res) => {
    const ticket = await TicketModel.findOne({_id: req.params.id});
    console.log(ticket);
    const datos = {
        name: `${ticket.name} ${ticket.last_name} ${ticket.mother_last_name}`,
        email: ticket.email,
        phone: ticket.phone,
        numbers: ticket.numbers
    };
    const qrContent = "Boleto de prueba";
    qr.toDataURL(qrContent, (err, qrContent) => {
        if(err){
            console.log(err);
            res.status(500).send("Error al generar el código QR");
        }else{
            res.render('ticket', {qrContent, datos});
        }
    })
}

const confirmPayment = async (req, res) => {
    const id = req.params.id
    const ticket = await TicketModel.findOne({_id: id});
    const s3 = new AWS.S3({
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY,
        region: config.REGION
    });
    const params = {
        Bucket: "payments-photo",
        Key: `${ticket._id}.jpg`,
    }
    const imgAward = await s3.getObject(params).promise();
    const imgBase64 = imgAward.Body.toString("base64");
    ticket.imgBase64 = imgBase64;
    const ticket_with_img = {
        _id: ticket._id,
        confirmPayment: ticket.confirm_payment,
        date_shop: ticket.date_shop,
        email: ticket.email,
        giveway_id: ticket.giveway_id,
        last_name: ticket.last_name,
        mother_last_name: ticket.mother_last_name,
        name: ticket.name,
        numbers: ticket.numbers,
        phone: ticket.phone,
        imgBase64: `data:image/png;base64,${imgBase64}`
    }
    res.status(200).json({success: true, data: ticket_with_img});
}

const generateTokenForTicket = (req, res) => {
    const { email, _id, phone } = req.body;
    const payload = {email,_id,phone}
    const token = jwt.sign(payload, config.SECRET_KEY_TICKETS)
    res.status(200).json({success: true, data: token})
}

const submitTicketsExcel = async (req, res) => {
    console.log(req.file);

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    console.log(jsonData);
    jsonData.map( async ticket => {
        const numbers_array = ticket.tickets.split(",").map(Number);
        const datejs = new Date((ticket["fecha de compra"] - 25569) * 86400 * 1000);
        const format_ticket = {
            numbers: numbers_array,
            last_name: ticket["Apellido paterno"],
            mother_last_name: ticket["Apellido materno"],
            name: ticket.Nombre,
            email: ticket.email,
            phone: ticket.telefono,
            date_shop: datejs,
            giveway_id: req.body.giveway_id,
            payment_photo: "SUBMITEXCEL",
            confirmPayment: true
        }
        console.log(format_ticket)
        const new_ticket = new TicketModel(format_ticket);
        await new_ticket.save();
    })
    res.json({success: true, data: 'archivo subido'});
}

export default { getTicketsByGiveway, buyTicket, renderTickets, confirmPayment, generateTokenForTicket, submitTicketsExcel }