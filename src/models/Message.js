import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    userOrigin: { ref: 'User', type: Schema.Types.ObjectId },
    message: { type: String },
    userDestination: { ref: 'User', type: Schema.Types.ObjectId },
    fechaCreacion: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Message', messageSchema)