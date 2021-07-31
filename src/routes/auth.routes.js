import { Router } from 'express'
import authController from '../controllers/auth.controller'
import { authJwt } from '../middlewares'

const router = Router();

router.post('/signin', authController.iniciarSesion);
router.post('/register', authController.registrarCuenta);
router.post('/change-password', [authJwt.verifyToken], authController.cambiarContrasena);
router.post('/delete-account', [authJwt.verifyToken], authController.deleteAccount);
router.post('/logout', [authJwt.verifyToken], authController.cerrarSesion);

export default router;