import Producto from './Producto.model.js';

// GET /api/v1/productos — Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/v1/productos/:id — Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// POST /api/v1/productos — Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body;

    if (!nombre || !descripcion || precio === undefined || !categoria) {
      return res.status(400).json({ error: 'Nombre, descripción, precio y categoría son obligatorios' });
    }

    const nuevoProducto = await Producto.create({ nombre, descripcion, precio, categoria, stock });

    res.status(201).json({ message: 'Producto creado correctamente', producto: nuevoProducto });
  } catch (error) {
    console.error('createProducto error:', error.message);
    res.status(500).json({ error: 'Error al crear el producto', detalle: error.message });
  }
};

// PUT /api/v1/productos/:id — Actualizar un producto
export const updateProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado correctamente', producto: productoActualizado });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// DELETE /api/v1/productos/:id — Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
