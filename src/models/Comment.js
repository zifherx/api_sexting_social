import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    post: { ref: 'Post', type: Schema.Types.ObjectId },
    user: { ref: 'User', type: Schema.Types.ObjectId },
    comment: { type: String },
    fechaCreacion: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Comment', commentSchema);