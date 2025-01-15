const { Schema, model } = require("mongoose")

const noteSchema = Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: Array
    },
    pin: {
        type: Boolean
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const noteModel = new model("notes", noteSchema);

module.exports = {
    noteModel
}