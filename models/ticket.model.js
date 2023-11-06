import { Schema, model } from 'mongoose';

const ticket_schema = new Schema({
    numbers:{
		type: Array,
		require: true
	},
    last_name: {
        type: String,
		require: true
    },
	mothet_last_name:{
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	phone:{
		type: String,
		require: true
	},
    method_payment: {
        type: String,
        required: true
    },
    date_shop: {
        type: Date,
        default: Date.now
    },
    giveway_id: {
        type: Schema.Types.ObjectId,
        ref: "Giveway"
    }
});

export default model("Ticket", ticket_schema);