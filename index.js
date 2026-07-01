import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => res.send('API de Catálogo Público de Productos'));

const PORT = process.env.PORT || 5200;

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('¡Conectado exitosamente a MongoDB Atlas (Catálogo Público)!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));
