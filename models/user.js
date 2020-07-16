const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let ROLES = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role.'
}

let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The field is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ROLES
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: false
    }
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

UserSchema.plugin(mongooseUnique, {message: '{PATH} must be unique'});

module.exports = mongoose.model('User', UserSchema);