import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        requrie: true
    },
    email: {
        type: String,
        require: true
    },
    giveaways: [{type: Schema.Types.ObjectId}]
});

export default model("User", userSchema);