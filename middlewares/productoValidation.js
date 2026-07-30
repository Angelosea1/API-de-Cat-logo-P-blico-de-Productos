import { body, param, query, validationResult } from 'express-validator';

/**
 * Middleware para capturar y manejar errores de validación de express-validator.
 * Devuelve un estado HTTP 400 Bad Request si existen fallos de validación.
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      error: 'Error de validación en los datos enviados',
      detalles: errors.array(),
    });
  }
  next();
};

/**
 * Cadenas de validación para GET /api/v1/productos (Filtros y Búsqueda)
 */
export const validateGetProductos = [
  query('minPrecio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('minPrecio debe ser un número mayor o igual a 0'),
  query('maxPrecio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('maxPrecio debe ser un número mayor o igual a 0'),
  query('buscar')
    .optional()
    .trim()
    .escape(),
  query('categoria')
    .optional()
    .trim()
    .escape(),
  query('orden')
    .optional()
    .isIn(['precio_asc', 'precio_desc', 'nombre_asc', 'nombre_desc', 'asc', 'desc'])
    .withMessage('orden debe ser uno de: precio_asc, precio_desc, nombre_asc, nombre_desc, asc, desc'),
];

/**
 * Validación para verificar que :id cumple el formato 24-hex ObjectId de MongoDB
 */
export const validateProductoId = [
  param('id')
    .isMongoId()
    .withMessage('El ID de producto proporcionado no es un ObjectId válido de MongoDB'),
];

/**
 * Cadenas de validación para POST /api/v1/productos (Creación)
 */
export const validateCreateProducto = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .trim()
    .escape(),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .trim()
    .escape(),
  body('precio')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .trim()
    .escape(),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
];

/**
 * Cadenas de validación para PUT /api/v1/productos/:id (Actualización)
 */
export const validateUpdateProducto = [
  param('id')
    .isMongoId()
    .withMessage('El ID de producto proporcionado no es un ObjectId válido de MongoDB'),
  body('nombre')
    .optional()
    .trim()
    .escape(),
  body('descripcion')
    .optional()
    .trim()
    .escape(),
  body('precio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  body('categoria')
    .optional()
    .trim()
    .escape(),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
];
