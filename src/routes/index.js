import { Router } from 'express'
import authRoutes from './auth.routes'
import roleRoutes from './role.routes'
import userRoutes from './user.routes'
import postRoutes from './post.routes'

const router = Router();

router.get('/', (req, res) => {
    res.send('Bienvenido al API Social')
});

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;