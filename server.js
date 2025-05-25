/*
const express = require('express');
const cors = require('cors'); // ← Primero importas cors
const dotenv = require('dotenv');
const sequelize = require('./database/config');
const pedidoRoutes = require('./routes/pedidos');
const inventarioRoutes = require('./routes/inventario');
app.use('/api/inventario', inventarioRoutes);

dotenv.config();

const app = express(); // ← Aquí se inicializa "app"

// Middleware
app.use(cors());       // ← Ahora SÍ puedes usarlo
app.use(express.json());

app.use('/api/pedidos', pedidoRoutes);

// Conexión con la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MariaDB');

    app.get('/', (req, res) => {
      res.send('Servidor funcionando correctamente ✅');
    });

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error de conexión a la base de datos:', err));
  */

  const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database/config');
const pedidoRoutes = require('./routes/pedidos');
const inventarioRoutes = require('./routes/inventario');

dotenv.config();

const app = express(); // ✅ primero se crea la instancia

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/inventario', inventarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

// Conexión a base de datos y levantamiento del servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MariaDB');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });
