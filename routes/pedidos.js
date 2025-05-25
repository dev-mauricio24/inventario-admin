const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rutas correctas con funciones controladoras
router.post('/', pedidoController.crearPedido);
router.get('/', pedidoController.obtenerPedidos);
router.put('/:id', pedidoController.actualizarEstado);
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
