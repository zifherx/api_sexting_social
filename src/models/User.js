import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String },
    password: { type: String, require: true },
    email: { type: String, require: true },
    titleImage: { type: String },
    imageProfile: { type: String },
    description: { type: String },
    roles: { ref: "Role", type: Schema.Types.ObjectId },
    status: { type: Boolean, default: true },
    online: { type: Number, default: 0 }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async(clave) => {
    const salto = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salto);
}

userSchema.statics.matchPassword = async(clave, claveRecibida) => {
    return await bcrypt.compare(clave, claveRecibida);
}

export default model('User', userSchema)