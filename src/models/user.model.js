import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.comparePassword = function(has_password) {
    return bcrypt.compareSync(has_password, this.password);
};

export default model("User", userSchema);