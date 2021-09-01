import { Router } from "express";
import { deleteUsuario, getUsuarioById, getUsuarios, postUsuarios, putUsuario } from "../controllers/usuarios";

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', postUsuarios );
router.put('/:id', putUsuario)
router.delete('/:id', deleteUsuario)








export default router;