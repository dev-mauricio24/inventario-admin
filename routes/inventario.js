const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario.js');

// ✅ Obtener inventario
router.get('/', async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Crear nuevo producto
router.post('/', async (req, res) => {
  let { producto, cantidad } = req.body;

  if (!producto || cantidad == null || cantidad < 0) {
    return res.status(400).json({ error: 'Producto y cantidad válidos son requeridos' });
  }

  // Normaliza el nombre para evitar duplicados con mayúsculas
  producto = producto.trim().toLowerCase();

  try {
    // Verifica si ya existe
    const existente = await Inventario.findOne({ where: { producto } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un producto con ese nombre' });
    }

    // Crear nuevo producto
    const nuevo = await Inventario.create({ producto, cantidad });
    res.status(201).json(nuevo);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe un producto con ese nombre' });
    }
    res.status(500).json({ error: err.message || 'Error desconocido' });
  }
});

// 🗑️ Eliminar un producto del inventario por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Inventario.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado del inventario' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔁 Actualizar cantidad del producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (cantidad == null || isNaN(cantidad) || cantidad < 0) {
    return res.status(400).json({ error: 'Cantidad válida requerida' });
  }

  try {
    const producto = await Inventario.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.cantidad = cantidad;
    await producto.save();

    res.json({ mensaje: 'Cantidad actualizada correctamente', producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
