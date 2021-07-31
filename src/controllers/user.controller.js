import Role from '../models/Role'
import User from '../models/User'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'
import 'dotenv/config'

const userCtrl = {};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
});

userCtrl.getAll = async(req, res) => {
    try {
        const query = await User.find().sort({ name: 'asc' }).populate('roles');

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Usuarios' })
        }

    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.getOne = async(req, res) => {
    const { userId } = req.params;
    try {
        const query = await User.findById(userId).populate('roles');
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen el Usuario' })
        }

    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.createUser = async(req, res) => {
    const { name, username, password, email, roles, titleImage, imageProfile } = req.body;
    try {
        const newUser = new User({
            name,
            username,
            password: await User.encryptPassword(password),
            email,
            titleImage,
            imageProfile
        });
        if (roles) {
            const foundRole = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRole.map(a => a._id);
        } else {
            const rol = await Role.findOne({ name: 'Usuario' });
            newUser.roles = [rol._id];
        }

        const query = await newUser.save();

        if (query) {
            res.json({ message: 'Usuario creado con éxito' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.updateProfile = async(req, res) => {
    // const {userId} = req.params;
    const { userId, username, name, email, description } = req.body;
    console.log(req.body)
    const data_image = req.file
    try {
        //Cloudinary
        const result = await cloudinary.uploader.upload(data_image.path);
        // console.log(result);
        const query = await User.findByIdAndUpdate(userId, { name, username, email, description, titleImage: result.public_id, imageProfile: result.url });
        console.log(query)
        if (query) {
            await fs.unlink(data_image.path)
            res.json({ message: 'Perfil actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Perfil no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.updateUser = async(req, res) => {
    const { userId } = req.params;
    const { name, username, email, status } = req.body;
    try {
        const query = await User.findByIdAndUpdate(userId, { name, username, email, status });
        if (query) {
            res.json({ message: 'Usuario actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.deleteUser = async(req, res) => {
    const { userId } = req.params;
    try {
        const query = await User.findByIdAndRemove(userId);

        if (query) {
            res.json({ message: 'Usuario eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export default userCtrl;