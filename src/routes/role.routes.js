import { Router } from 'express'
import RoleController from '../controllers/role.controller'

const router = Router();

router.get('/', RoleController.getAll);
router.post('/', RoleController.createRole);
router.get('/:roleId', RoleController.getOne);
router.put('/:roleId', RoleController.updateRole);
router.delete('/:roleId', RoleController.deleteRole);

export default router;