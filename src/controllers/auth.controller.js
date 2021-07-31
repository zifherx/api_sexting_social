import Role from '../models/Role'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const authCtrl = {};

authCtrl.iniciarSesion = async(req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    // console.log(userFound)

    if (!userFound) return res.status(404).json({ message: 'Usuario no existe' });

    if (!userFound.status) return res.status(403).json({ message: 'Usuario Inactivo' })

    const matchPassword = await User.matchPassword(password, userFound.password);

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña Errónea' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: '24h' });

    //Cambio de estado de online
    const online = await User.findByIdAndUpdate(userFound._id, { online: 1 })

    res.json({ token, codigo: userFound._id });
}

authCtrl.cambiarContrasena = async(req, res) => {
    const { id } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) return res.status(400).json({ message: 'Las contraseñas no coinciden' });

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: 'Usuario no existe' });

    const matchPassword = await User.matchPassword(oldPassword, userFound.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña Errónea' })

    userFound.password = await User.encryptPassword(newPassword);
    const newObj = await userFound.save();
    try {
        if (newObj) return res.json({ message: 'Contraseña actualizada con éxito' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

authCtrl.registrarCuenta = async(req, res) => {
    const { name, username, password, email, roles } = req.body;

    const newUser = new User({
        name,
        username,
        password: await User.encryptPassword(password),
        email,
    });

    if (roles) {
        const foundRole = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRole.map(a => a._id);
    } else {
        const rol = await Role.findOne({ name: 'Usuario' });
        newUser.roles = [rol._id];
    }

    const query = await newUser.save();
    const token = jwt.sign({ id: query._id }, config.SECRET, { expiresIn: '24h' });

    res.json({ token, codigo: query._id, message: 'Cuenta registrada con éxito' })
}

authCtrl.deleteAccount = async(req, res) => {
    const { id } = res.locals.jwtPayload;
    const { nowPassword } = req.body;

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: 'Usuario no existe' });

    const matchPassword = await User.matchPassword(nowPassword, userFound.password);

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });

    try {
        const dropAccount = await User.findByIdAndDelete(id);
        if (dropAccount) return res.json({ message: 'Cuenta eliminada con éxito' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message })
    }
}

authCtrl.cerrarSesion = async(req, res) => {
    const { id } = res.locals.jwtPayload;
    console.log(id);
    try {
        const offline = await User.findByIdAndUpdate(id, { online: 0 })
        if (offline) {
            res.json({ message: 'Sesión Cerrada con éxito' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default authCtrl;