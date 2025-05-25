const express = require('express');
const router = express.Router();

// ✅ verificar disponibilidad
router.get('/', async (req, res) => {
    res.json({ OK: true, status: 'UP' })
});

module.exports = router;