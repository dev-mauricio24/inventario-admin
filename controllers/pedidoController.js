const Pedido = require('../models/Pedido.js');
const Inventario = require('../models/inventario.js');

// Crear Pedido con validación de inventario
const crearPedido = async (req, res) => {
  const { cliente, producto, cantidad } = req.body;

  if (!cliente || !producto || !cantidad || cantidad <= 0) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0'
    });
  }

  try {
    const inventario = await Inventario.findOne({ where: { producto } });

    if (!inventario) {
      return res.status(404).json({ error: 'Producto no existe en el inventario' });
    }

    if (inventario.cantidad < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Descontar del inventario
    inventario.cantidad -= cantidad;
    await inventario.save();

    const pedido = await Pedido.create({ cliente, producto, cantidad });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado del pedido y gestionar inventario si se cancela
const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ error: 'El campo estado es obligatorio' });
  }

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // ✅ Devolver al inventario solo si el estado actual es cancelado
    if (estado == 'cancelado') {
      const inventario = await Inventario.findOne({ where: { producto: pedido.producto } });
    
      if (inventario) {
        inventario.cantidad += pedido.cantidad;
        await inventario.save();
        console.log(`→ DEVOLVER: ${pedido.cantidad} unidad(es) de ${pedido.producto}`);
      }
    }

    // ✅ Actualizar el estado del pedido después de devolver el stock
    pedido.estado = estado;
    await pedido.save();

    res.json({ mensaje: 'Estado actualizado', pedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un pedido
const eliminarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    await pedido.destroy();
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  actualizarEstado,
  eliminarPedido
};