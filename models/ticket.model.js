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
	mother_last_name:{
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
    // method_payment: {
    //     type: String,
    //     required: true
    // },
    date_shop: {
        type: Date,
        default: Date.now
    },
    giveway_id: {
        type: Schema.Types.ObjectId,
        ref: "Giveway"
    },
	payment_photo: {
		type: String,
	},
	confirm_payment: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: "online",
		require: true
	}
});

export default model("Ticket", ticket_schema);