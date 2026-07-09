import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

import productoRoutes from './modules/producto/producto.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

// Rutas
app.use('/api/v1/productos', productoRoutes);
app.get('/', (req, res) => res.json({ message: 'API de Catálogo Público de Productos activa ✅' }));

// --- Conexión a MongoDB con caché para entornos serverless ---
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI no está definida en las variables de entorno.');
  }

  await mongoose.connect(uri);
  isConnected = true;
  console.log('Conectado a MongoDB Atlas (Catálogo Público)');
}

// Middleware que conecta a DB antes de cada request (serverless-safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err.message);
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

// Para ejecución local (no en Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5200;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor local en puerto ${PORT}`));
  });
}

export default app;