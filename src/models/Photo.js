import { Schema, model } from 'mongoose'

const photoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    public_id: { type: String },
    urlImage: { type: String },
    fechaPublicacion: { type: Date, default: Date.now },
    user: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Photo', photoSchema);