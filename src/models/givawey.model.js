import { Schema, model } from 'mongoose';

const givawey_schema = new Schema({
    title: {
        type: String,
        require: true
    },
    total_tickets: {
        type: Number,
        require: true,
        min: 1
    },
    awards: [{
        img: String,
        name: String,
        model: String
    }],
    bases: {
        type: Array,
        require: true,
        default: []
    },
    purchased_tickets:[{
        type: Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    expiration_date: {
        type: Date,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("Giveway", givawey_schema)