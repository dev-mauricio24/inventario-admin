-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS pedidosDB;

-- Seleccionar la base de datos
USE pedidosDB;

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'apppassword';
GRANT ALL PRIVILEGES ON pedidosDB.* TO 'appuser'@'%';
FLUSH PRIVILEGES;

-- Crear tabla inventario
CREATE TABLE IF NOT EXISTS inventario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto VARCHAR(100) NOT NULL UNIQUE,
  cantidad INT NOT NULL DEFAULT 0
);

-- Crear tabla pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100) NOT NULL,
  producto VARCHAR(100) NOT NULL,
  cantidad INT NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales (opcional)
INSERT INTO inventario (producto, cantidad) VALUES
('Laptop Lenovo', 10),
('Monitor LG', 15),
('Impresora HP', 5);

INSERT INTO pedidos (cliente, producto, cantidad) VALUES
('Carlos Ramírez', 'Laptop Lenovo', 1),
('Ana Pérez', 'Monitor LG', 2);
