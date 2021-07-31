import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    user: { ref: 'User', type: Schema.Types.ObjectId },
    texto: { type: String },
    image: [{ ref: 'Photo', type: Schema.Types.ObjectId }],
    // comments: [{ ref: 'Comment', type: Schema.Types.ObjectId }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Post', postSchema);