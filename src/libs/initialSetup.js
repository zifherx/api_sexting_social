import Role from '../models/Role'
import User from '../models/User';

export const createRoles = async() => {
    try {
        const conteo = await Role.estimatedDocumentCount();

        if (conteo > 0) return;

        const valores = await Promise.all([
            new Role({ name: 'Administrador', description: 'Webmaster' }).save(),
            new Role({ name: 'Usuario', description: 'Usuario Común' }).save()
        ])
        console.log(valores)
    } catch (err) {
        console.log(err)
    }
}

export const createAdminUser = async() => {
    try {
        const master = await User.estimatedDocumentCount();

        const roleAdmin = await Role.find({ name: 'Administrador' });
        let codigoRol = roleAdmin.map(a => a._id)

        if (master > 0) return;
        const usuario = await Promise.all([
            new User({
                name: 'Fernando Rojas',
                username: 'zifherx',
                password: await User.encryptPassword('admin'),
                email: 'frojasq@ziphonex.com',
                description: 'Webmaster de Sexting Social',
                roles: codigoRol
            }).save()
        ])
        console.log(usuario)
    } catch (err) {
        console.log(err)
    }
}