 -- Tabla administrador
CREATE TABLE Administrador (
    cedula Varchar(12) primary KEY NOT null unique,
    nombre VARCHAR(20) not null,
    apellido VARCHAR(20) not null,
    telefono Varchar(11) not null,
    correo VARCHAR(25) not null unique,
    Contraseña Varchar(30) not null 
);

alter table usuario modify COLUMN cedula Varchar(12) unique;
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE Productos (
    idProducto int PRIMARY KEY Auto_increment,
    nombreProducto VARCHAR(50),
    precio double,
    existencias int,
    Disponibilidad boolean
);
-- Crear tabla Usuario
CREATE TABLE Usuario (
    cedula varchar(12) PRIMARY KEY unique,
    nombre VARCHAR(20) not null,
    apellido VARCHAR(20) not null,
    telefono VARCHAR(12) not null,
    correo VARCHAR(25) not null unique,
    IdDireccion Varchar(100) not null,
    Contraseña Varchar(30) not null
 );


-- Tabla de Items del Carrito

-- Crear tabla Barrio
CREATE TABLE Barrio (
    idBarrio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE             
);


