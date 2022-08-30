const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'Nome é obrigatório'],
        maxlength: 32
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'Sobrenome é obrigatório'],
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'E-mail  é obrigatório'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter no mínimo seis(6) caracters'],
        match: [/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            'Senha must contain at leat 1 uppercase letter, 1 lowercase letter, 1 digit and a special character'
        ],
    },


    role: {
        type: Number,
        default: 0
    }


}, { timestamps: true })



// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 600
    });
}

module.exports = mongoose.model("User", userSchema);