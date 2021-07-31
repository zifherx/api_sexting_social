import { Router } from 'express'
import UserController from '../controllers/user.controller'
import upload from '../middlewares/multer'

const router = Router();

router.get('/', UserController.getAll);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getOne);
router.put('/:userId', UserController.updateUser);
router.patch('/update-profile', upload.single('image'), UserController.updateProfile);
router.delete('/:userId', UserController.deleteUser);

export default router;