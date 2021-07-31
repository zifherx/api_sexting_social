import Post from '../models/Post'
import User from '../models/User';

const postCtrl = {};

postCtrl.getAll = async(req, res) => {
    try {
        const query = await Post.find().sort({ fechaCreacion: -1 }).populate('user');
        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Posts' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

postCtrl.getOneById = async(req, res) => {
    const { postId } = req.params;
    try {
        const query = await Post.findById(postId);
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Post' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

postCtrl.getAllByUser = async(req, res) => {
    const { usuario } = req.body;
    try {
        const foundUser = await User.find({ email: { $in: usuario } })
            // console.log(foundUser)

        if (foundUser.length == 0) return res.status(404).json({ message: 'Usuario no existe' })

        const foundPosts = await Post.find({ user: { $in: foundUser._id } })

        if (foundPosts.length > 0) {
            res.json(foundPosts);
        } else {
            return res.status(404).json({ message: 'No existen Post de este usuario aún' })
        }

    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

postCtrl.createPost = async(req, res) => {
    const { user, texto } = req.body;
    try {
        const newPost = new Post({
            texto
        })
        const foundUser = await User.find({ email: { $in: user } })
        newPost.user = foundUser.map(a => a._id);

        const query = await newPost.save();
        console.log(query)
        if (query) {
            res.json({ message: 'Post creado con éxito' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

postCtrl.deletePost = async(req, res) => {
    const { postId } = req.params;
    try {
        const query = await Post.findByIdAndDelete(postId);
        if (query) {
            res.json({ message: 'Post eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Post no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export default postCtrl;