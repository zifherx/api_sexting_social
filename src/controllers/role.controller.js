import Role from '../models/Role';

const roleCtrl = {};

roleCtrl.getAll = async(req, res) => {
    try {
        const query = await Role.find();

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Roles' })
        }

    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

roleCtrl.getOne = async(req, res) => {
    const { roleId } = req.params;
    try {
        const query = await Role.findById(roleId);
        if (query) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existe el Rol' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

roleCtrl.createRole = async(req, res) => {
    const { name, description } = req.body;
    try {
        const newRole = new Role({ name, description });

        const query = await newRole.save();

        if (query) {
            res.json({ message: 'Rol creado con éxito' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

roleCtrl.updateRole = async(req, res) => {
    const { roleId } = req.params;
    const { name, description } = req.body;
    try {
        const query = await Role.findByIdAndUpdate(roleId, { name, description });
        if (query) {
            res.json({ message: 'Rol actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

roleCtrl.deleteRole = async(req, res) => {
    const { roleId } = req.params;
    try {
        const query = await Role.findByIdAndDelete(roleId);
        if (query) {
            res.json({ message: 'Rol eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export default roleCtrl;