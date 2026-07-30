import { Router } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from './producto.controller.js';
import AppToken from '../../middlewares/AppToken.js';
import {
  validateGetProductos,
  validateProductoId,
  validateCreateProducto,
  validateUpdateProducto,
  handleValidationErrors,
} from '../../middlewares/productoValidation.js';

const router = Router();

// Todas las rutas de /api/v1/productos requieren app-token válido
router.use(AppToken);

router.get('/', validateGetProductos, handleValidationErrors, getProductos);
router.get('/:id', validateProductoId, handleValidationErrors, getProductoById);
router.post('/', validateCreateProducto, handleValidationErrors, createProducto);
router.put('/:id', validateUpdateProducto, handleValidationErrors, updateProducto);
router.delete('/:id', validateProductoId, handleValidationErrors, deleteProducto);

export default router;
