import { Router } from 'express'
import PostController from '../controllers/post.controller'
const router = Router();

router.get('/', PostController.getAll);
router.get('/:postId', PostController.getOneById);
router.post('/by-user', PostController.getAllByUser);
router.post('/', PostController.createPost);
router.delete('/:postId', PostController.deletePost);

export default router;