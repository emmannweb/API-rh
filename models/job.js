const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const vagaSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Título da vaga é obrigatório'],
        maxlength: 70
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Descrição  é obrigatória'],
    },

    salary: {
        type: Number,
        trim: true,
        required: [true, 'Salário é obrigatório'],
    },

    cvLinkendIn: {
        type: String,
        trim: true
    },


    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    jobType: {
        type: ObjectId,
        ref: 'JobType',
        required: true
    }


}, { timestamps: true })

module.exports = mongoose.model("Jobs", vagaSchema);