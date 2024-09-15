// src/app/index.js
const express = require('express');
const cors = require('cors'); // Importa el middleware CORS

const app = express();
const userRoutes = require('./routes/userRoutes');
const colabRoutes = require('./routes/colabSpacesRoutes');
const modelRoutes = require('./routes/modelRoutes');

// Habilitar CORS para todas las rutas
app.use(cors());

// Alternativamente, puedes habilitar CORS solo para un dominio específico
// app.use(cors({
//   origin: 'http://localhost:3000' // Cambia esto al origen del frontend
// }));

app.use(express.json());
app.use('/users', userRoutes);
app.use('/colabs', colabRoutes);
app.use('/model', modelRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
