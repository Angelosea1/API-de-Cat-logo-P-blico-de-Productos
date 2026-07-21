import { Router } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from './producto.controller.js';
import AppToken from '../../middlewares/AppToken.js';

const router = Router();

// Todas las rutas de /api/v1/productos requieren app-token válido
router.use(AppToken);

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;
