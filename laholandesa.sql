create database sistema_de_compra_venta_para_la_holandesa;

use sistema_de_compra_venta_para_la_holandesa;

select * from categoria;

-- SCRIPT COMPLETO

-- TABLA categoria

CREATE TABLE categoria (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre_categoria VARCHAR(50) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1
);


insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values 
('QUESOS','PRODUCTOS LACTEOS DERIVADOS DEL PROCESO DE CUAGULACION DE LA LECHE.', '2022-01-13'),
('YOGURTS','PRODUCTOS LACTEOS FERMENTADOS, NUTRITIVOS Y DELICIOSOS', '2024-01-10'),
('MANTEQUILLAS','PRODUCTOS LACTEOS OBTENIDO MEDIANTE EL BATIDO DE LA CREMA DE LECHE.', '2020-09-10'),
('CREMAS','PRODUCTOS LACTEOS CON UNA TEXTURA SUAVE Y CREMOSA.', '2024-07-08'),
('OTROS','ESTA CATEGORIA INCLUYE PRODUCTOS LACTEOS QUE NO SE AJUSTAN FACILMENTE A LAS CATEGORIAS ANTERIORES', '2022-01-20');

--SELECT * FROM "categoria";


-- TABLA medida

CREATE TABLE medida (
    id_medida INT IDENTITY(1,1) PRIMARY KEY,
    nombre_medida VARCHAR(50) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1
);


insert into medida (nombre_medida,descripcion,fecha_registro) 
values 
('KILOGRAMO','UNIDAD DE MEDIDA PARA PRODUCTOS EN PESO', '2022-01-13'),
('LITRO','UNIDAD DE MEDIDA PARA PRODUCTOS LIQUIDOS', '2022-01-13'),
('UNIDAD','UNIDAD DE MEDIDA PARA PRODUCTOS INDIVIDUALES', '2022-01-13');

--SELECT * FROM "medida";


-- TABLA proveedor

CREATE TABLE proveedor (
    id_proveedor INT IDENTITY(1,1) PRIMARY KEY,
    razon_social VARCHAR(100) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    telefono INT NULL,
    descripcion VARCHAR(256) COLLATE Latin1_General_CS_AS NULL,
    direccion VARCHAR(256) COLLATE Latin1_General_CS_AS NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1
);


insert into proveedor(razon_social,telefono,descripcion,direccion,fecha_registro) 
values 
('MENONITAS QUESOS','76347978','PRODUCTOR DE QUESOS MENONITAS TRADICIONALES.','CALLE PRINCIPAL #123, COLONIA MENONITA.', '2022-01-15'),
('MANTEQUILLAS MENONITAS','62357918','PROVEEDOR DE MANTEQUILLAS MENONITAS NATURALES.','AVENIDA DE LAS VACAS #45, COLONIA LECHERA.', '2022-02-03'),
('GRANJA LACTEA MENONITA','78346123','GRANJA LACTEA QUE PRODUCE PRODUCTOS LACTEOS NATURALES.','CAMINO DE LA LECHE #789, ALDEA LACTEA.', '2022-03-10'),
('LECHERIA LOS HERMANOS','76613097','LECHERIA QUE OFRECE UNA VARIEDAD DE PRODUCTOS LACTEOS.','RUTA DE LA LECCHERIA #567, BARRIO LACTEO.', '2022-04-25'),
('QUESOS ARTESANALES MENONITAS','71112223','PRODUCTOR DE QUESOS CON RECETAS ARTESANALES.','CALLE DEL QUESO #321, COLONIA ARTESANAL.', '2022-05-12'),
('MIEL Y LACTEOS LA GRANJA','67689214','PRODUCTOR DE MIEL Y PRODUCTOS LACTEOS NATURALES.','CAMINO DE LA MIEL #246, GRANJA DE LA MIEL.', '2022-06-30'),
('QUESOS Y YOGURES MONONITAS','78976721','PROVEEDOR DE QUESOS Y YOGURES MENONITAS.','BOULEVARD DE LOS YOGURES #11, COLONIA LACTEA.', '2022-07-18'),
('LACTEOS LA PRADERA','61236897','GRANJA LACTEA QUE PRODUCE UNA VARIEDAD DE PRODUCTOS LACTEOS.','CARRETERA DE LA PRADERA #1, FINCA LACTEA.', '2022-08-05'),
('QUESERIA MENONITAS','62225689','QUESERIA QUE ELABORA UNA VARIEDAD DE QUESOS MONONITAS.','BARRIO DEL QUESO #555, BARRIO LACTEO.', '2022-09-20'),
('LACTEOS LOS AMIGOS','76789123','PRODUCTOR DE PRODUCTOS LACTEOS FRESCOS Y NATURALES.','AVENIDA DE LOS  AMIGOS #789, COLONIA LACTEA', '2022-10-08');

--select * from proveedor;


-- TABLA cliente


CREATE TABLE cliente (
    id_cliente INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    apellido VARCHAR(100) COLLATE Latin1_General_CS_AS NULL,
    nit BIGINT UNIQUE NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1
);


INSERT INTO cliente (nombre, apellido, nit, fecha_registro)
VALUES 
('JUAN', 'PEREZ', 1234567890, '2023-05-30'),
('MARIA', 'LOPEZ', 9876543210, '2023-04-14'),
('CARLOS', 'RODRIGUEZ', 4567891230, '2023-02-10'),
('ANA', 'GARCIA', 7891234560, '2023-03-01'),
('PEDRO', 'MARTINEZ', 6543219870, '2023-01-08'),
('LAURA', 'GONZALES', 3216549870, '2023-08-12'),
('DIEGO', 'HERNANDEZ', 9876541230, '2023-09-13'),
('ANDREA', 'DIAZ', 1592634870, '2023-10-15'),
('MARTIN', 'SANCHEZ', 3698521470, '2023-11-17'),
('NATALIA', 'FLORES', 8529637410, '2023-12-20'),
('DARLYN', 'FLORES', 8529637415, '2023-12-20');




CREATE TABLE usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombres VARCHAR(150) COLLATE Latin1_General_CS_AS NOT NULL,
    apellidos VARCHAR(150) COLLATE Latin1_General_CS_AS NOT NULL,
    perfil VARCHAR(20) NULL,
    usuario VARCHAR(100) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    contraseña VARCHAR(200) COLLATE Latin1_General_CS_AS NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1
);


INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, fecha_registro)
VALUES 
('EDUARDO', 'CASTRO RUIZ', 'ADMINISTRADOR', 'EDUARDOVIAJERO23', '$2a$12$MH66.Ob.fy.MnPqmeKLfeOorQBnvHBIT/WATlOYO4Az4uPKwucwy2', CURRENT_TIMESTAMP),
('LAURA', 'REA GOMEZ', 'VENDEDOR', 'LAURA_BAILARINA87', '$2a$12$CFiGLNSND74ge9degzYmte9DrmDmJ1utuFM0cim0EcyfRBeTaHU2y', CURRENT_TIMESTAMP),
('AVIGAIL', 'MUIBA VELAZQUEZ', 'VENDEDOR', 'AVIGAIL_AVENTURERA99', '$2a$12$tXrHdUnBtUmbMb15qhBSl.fWDyTUIyzW1wvCZi9jbMLam5M1vW8jC', CURRENT_TIMESTAMP),
('LUIS FERNANDO', 'GUARDIA MAREÑO', 'VENDEDOR', 'LUISFANATIC', '$2a$12$E8H10ujN4PdxMxmCTWTrIOvhMVul2tmC6iJP1jF1jjNp5BnrqiUVu', CURRENT_TIMESTAMP),
('LUIS', 'ARAUCO', 'VENDEDOR', 'LUISPRO', '$2a$12$MIZ0o1Xv1p/xYn2cD2eLDurQC5Vn.DAOXaPdq3gFVo51dVXgk/C/a', CURRENT_TIMESTAMP),
('ABAD', 'MARTINEZ', 'VENDEDOR', 'ABADMASTER', '$2a$12$6JREezyqyC/OJ6tV.0srLu6xo/043w14QZU/GC2dZBChxu2jXA7yq', CURRENT_TIMESTAMP),
('ADHEMAR', 'ALBA FERNANDEZ', 'VENDEDOR', 'ADHEMARCREATIVO', '$2a$12$rMZi3NzTYGDbfvbkvEzGo.7OabCDmebaWbjiUCctm2kbwFMcsu0va', CURRENT_TIMESTAMP),
('FRANKLIN', 'CHAMBI', 'VENDEDOR', 'FRANKLIN88', '$2a$12$1iaUoi6lIFSfFtpZwCY.Ae7tZhgrFpIPKf79PT5APphEZKyFviAG6', CURRENT_TIMESTAMP),
('JUAN JOSE', 'LINO CHAMBI', 'VENDEDOR', 'JUAN_MUSICO', '$2a$12$ixvb35mphhr4M28LWfhWy.uDtEgPoazpmAt3dvr57u0elHBb75CU2', CURRENT_TIMESTAMP),
('MARCO', 'RAMIREZ YUCRA', 'VENDEDOR', 'MARCO_INQUIETO', '$2a$12$9I7mZYmotoMgm738xjpcauhPBWysONYWxr1QpyT1J30pkur9nEewC', CURRENT_TIMESTAMP);




CREATE TABLE producto (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre_producto VARCHAR(300) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
    precio DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
    fecha_elaboracion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    stock INT NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado BIT DEFAULT 1,
    id_categoria INT,
    id_medida INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_medida) REFERENCES medida(id_medida)
);


INSERT INTO producto (nombre_producto, precio, fecha_elaboracion, fecha_vencimiento, stock, fecha_registro, id_categoria, id_medida)
VALUES 
('QUESO MOZZARELLA', 10, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 1, 1),
('QUESO CHEDDAR', 12, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 1, 1),
('CREMA MOZZARELLA', 8, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 4, 1),
('CREMA CHEDDA', 8, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 4, 1),
('MANTEQUILLA MENONA CON SAL', 7, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 3, 1),
('MANTEQUILLA MENONA SIN SAL', 7, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 3, 1),
('RECORTES DE CHEDDAR', 6, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 5, 1),
('YOGURT DE FRESA', 10, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 2, 2),
('YOGURT DE VAINILLA', 10, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 2, 2),
('YOGURT DE DURAZNO', 10, '2022-04-20', '2022-10-20', 0, CURRENT_TIMESTAMP, 2, 2);



CREATE TABLE compra (
    id_compra INT IDENTITY(1,1) PRIMARY KEY,
    monto_compra DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
    fecha_compra DATETIME NOT NULL,
    estado BIT DEFAULT 1,
    id_proveedor INT,
    id_usuario INT,
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


INSERT INTO compra (monto_compra, fecha_compra, id_proveedor, id_usuario)
VALUES 
(920, '2023-01-05', 1, 1),
(160, '2023-02-10', 2, 1),
(200, '2023-03-15', 3, 1),
(200, '2023-04-01', 5, 1),
(560, '2023-01-25', 1, 1),
(70, '2023-02-25',  8, 1),
(105, '2023-03-05', 4, 1),
(170, '2023-01-10', 6, 1),
(100, '2023-04-02', 10, 1),
(150, '2023-02-20', 9, 1);



CREATE TABLE detalle_compra (
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_producto INT NOT NULL,
    precio_compra DECIMAL(10, 2),
    PRIMARY KEY (id_compra, id_producto),
    CONSTRAINT fk_compra FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);


INSERT INTO detalle_compra (id_compra, id_producto, cantidad_producto, precio_compra)
VALUES 
(1, 2,  50, 12),
(1, 3, 40, 8),
(2, 3, 20, 8),
(3, 9, 10, 10),
(3, 8, 10, 10),
(4, 3, 25, 8),
(5, 1, 20, 10),
(5, 2, 30, 12),
(6, 6, 10, 7),
(7, 5, 15, 7),
(8, 4, 10, 8),
(8, 7, 15, 6),
(9, 9, 10, 10),
(10, 1, 10, 10),
(10, 8, 5, 10);




CREATE TABLE venta (
    id_venta INT PRIMARY KEY IDENTITY(1,1),
    monto_venta DECIMAL(10, 2) NULL,
    fecha_venta DATETIME NOT NULL,
    estado BIT DEFAULT 1,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_usuario INT REFERENCES usuario(id_usuario)
);


INSERT INTO venta (monto_venta, fecha_venta, id_cliente, id_usuario)
VALUES 
(36, '2023-01-06', 1, 2),
(24, '2023-03-10', 2, 3),
(70, '2023-04-10', 3, 4),
(24, '2023-05-20', 4, 5),
(44, '2023-06-08', 5, 6),
(21, '2023-07-01',  6,7),
(14, '2023-02-11', 7, 8),
(38, '2023-09-14', 8, 9),
(20, '2023-09-20', 9, 10),
(30, '2023-09-30', 10, 2);


CREATE TABLE detalle_venta (
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_producto INT NOT NULL,
    precio_venta DECIMAL(10, 2),
    PRIMARY KEY (id_venta, id_producto),
    CONSTRAINT fk_venta FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    CONSTRAINT fk_productos FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);


INSERT INTO detalle_venta (id_venta, id_producto, cantidad_producto, precio_venta)
VALUES 
(1, 1,  2, 10),
(1, 3, 2, 8),
(2, 3, 3, 8),
(3, 9, 4, 10),
(3, 8, 3, 10),
(4, 3,  3, 8),
(5, 1, 2, 10),
(5, 2, 2, 12),
(6, 6, 3, 7),
(7, 5, 2, 7),
(8, 4, 1, 8),
(8, 7, 5, 6),
(9, 9, 2, 10),
(10, 1, 1, 10),
(10, 8, 2, 10);





















-- SCRIPT COMPLETO

-- TABLA categoria

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) COLLATE "C" UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into categoria (nombre_categoria,descripcion,fecha_registro) 
values 
('QUESOS','PRODUCTOS LACTEOS DERIVADOS DEL PROCESO DE CUAGULACION DE LA LECHE.', '2022-01-13'),
('YOGURTS','PRODUCTOS LACTEOS FERMENTADOS, NUTRITIVOS Y DELICIOSOS', '2024-01-10'),
('MANTEQUILLAS','PRODUCTOS LACTEOS OBTENIDO MEDIANTE EL BATIDO DE LA CREMA DE LECHE.', '2020-09-10'),
('CREMAS','PRODUCTOS LACTEOS CON UNA TEXTURA SUAVE Y CREMOSA.', '2024-07-08'),
('OTROS','ESTA CATEGORIA INCLUYE PRODUCTOS LACTEOS QUE NO SE AJUSTAN FACILMENTE A LAS CATEGORIAS ANTERIORES', '2022-01-20');

--SELECT * FROM "categoria";


-- TABLA medida

CREATE TABLE medida (
    id_medida SERIAL PRIMARY KEY,
    nombre_medida VARCHAR(50) COLLATE "C" UNIQUE NOT NULL,
    descripcion VARCHAR(256) NULL,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into medida (nombre_medida,descripcion,fecha_registro) 
values 
('KILOGRAMO','UNIDAD DE MEDIDA PARA PRODUCTOS EN PESO', '2022-01-13'),
('LITRO','UNIDAD DE MEDIDA PARA PRODUCTOS LIQUIDOS', '2022-01-13'),
('UNIDAD','UNIDAD DE MEDIDA PARA PRODUCTOS INDIVIDUALES', '2022-01-13');

--SELECT * FROM "medida";


-- TABLA proveedor

CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    razon_social VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
    telefono INTEGER NULL,
    descripcion VARCHAR(256) COLLATE "C" NULL,
    direccion VARCHAR(256) COLLATE "C" NOT NULL,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

insert into proveedor(razon_social,telefono,descripcion,direccion,fecha_registro) 
values 
('MENONITAS QUESOS','76347978','PRODUCTOR DE QUESOS MENONITAS TRADICIONALES.','CALLE PRINCIPAL #123, COLONIA MENONITA.', '2022-01-15'),
('MANTEQUILLAS MENONITAS','62357918','PROVEEDOR DE MANTEQUILLAS MENONITAS NATURALES.','AVENIDA DE LAS VACAS #45, COLONIA LECHERA.', '2022-02-03'),
('GRANJA LACTEA MENONITA','78346123','GRANJA LACTEA QUE PRODUCE PRODUCTOS LACTEOS NATURALES.','CAMINO DE LA LECHE #789, ALDEA LACTEA.', '2022-03-10'),
('LECHERIA LOS HERMANOS','76613097','LECHERIA QUE OFRECE UNA VARIEDAD DE PRODUCTOS LACTEOS.','RUTA DE LA LECCHERIA #567, BARRIO LACTEO.', '2022-04-25'),
('QUESOS ARTESANALES MENONITAS','71112223','PRODUCTOR DE QUESOS CON RECETAS ARTESANALES.','CALLE DEL QUESO #321, COLONIA ARTESANAL.', '2022-05-12'),
('MIEL Y LACTEOS LA GRANJA','67689214','PRODUCTOR DE MIEL Y PRODUCTOS LACTEOS NATURALES.','CAMINO DE LA MIEL #246, GRANJA DE LA MIEL.', '2022-06-30'),
('QUESOS Y YOGURES MONONITAS','78976721','PROVEEDOR DE QUESOS Y YOGURES MENONITAS.','BOULEVARD DE LOS YOGURES #11, COLONIA LACTEA.', '2022-07-18'),
('LACTEOS LA PRADERA','61236897','GRANJA LACTEA QUE PRODUCE UNA VARIEDAD DE PRODUCTOS LACTEOS.','CARRETERA DE LA PRADERA #1, FINCA LACTEA.', '2022-08-05'),
('QUESERIA MENONITAS','62225689','QUESERIA QUE ELABORA UNA VARIEDAD DE QUESOS MONONITAS.','BARRIO DEL QUESO #555, BARRIO LACTEO.', '2022-09-20'),
('LACTEOS LOS AMIGOS','76789123','PRODUCTOR DE PRODUCTOS LACTEOS FRESCOS Y NATURALES.','AVENIDA DE LOS  AMIGOS #789, COLONIA LACTEA', '2022-10-08');

--select * from proveedor;


-- TABLA cliente


CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
    apellido VARCHAR(100) COLLATE "C" NULL,
    nit BIGINT UNIQUE NOT NULL,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);


INSERT INTO cliente (nombre, apellido, nit, fecha_registro)
VALUES 
('JUAN', 'PEREZ', 1234567890, '2023-05-30'),
('MARIA', 'LOPEZ', 9876543210, '2023-04-14'),
('CARLOS', 'RODRIGUEZ', 4567891230, '2023-02-10'),
('ANA', 'GARCIA', 7891234560, '2023-03-01'),
('PEDRO', 'MARTINEZ', 6543219870, '2023-01-08'),
('LAURA', 'GONZALES', 3216549870, '2023-08-12'),
('DIEGO', 'HERNANDEZ', 9876541230, '2023-09-13'),
('ANDREA', 'DIAZ', 1592634870, '2023-10-15'),
('MARTIN', 'SANCHEZ', 3698521470, '2023-11-17'),
('NATALIA', 'FLORES', 8529637410, '2023-12-20'),
('DARLYN', 'FLORES', 8529637415, '2023-12-20');

--select * from "cliente";


-- TABLA usuario

--CREATE TABLE usuario (
--    id_usuario SERIAL PRIMARY KEY,
--    nombres VARCHAR(150) COLLATE "C" NOT NULL,
--    apellidos VARCHAR(150) COLLATE "C" NOT NULL,
--    foto bytea null,
--    perfil VARCHAR(20) NULL,
--    usuario VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
--    contraseña VARCHAR(200) COLLATE "C" NOT NULL,
--    fecha_registro TIMESTAMP NOT NULL,
--    estado BOOLEAN DEFAULT TRUE
--);

--INSERT INTO usuario (nombres, apellidos, foto, perfil, usuario, contraseña, fecha_registro)
--VALUES 
--('EDUARDO', 'CASTRO RUIZ', null, 'ADMINISTRADOR', 'EDUARDOVIAJERO23', '$2a$12$MH66.Ob.fy.MnPqmeKLfeOorQBnvHBIT/WATlOYO4Az4uPKwucwy2', CURRENT_TIMESTAMP),
--('LAURA', 'REA GOMEZ', null, 'VENDEDOR', 'LAURA_BAILARINA87', '$2a$12$CFiGLNSND74ge9degzYmte9DrmDmJ1utuFM0cim0EcyfRBeTaHU2y', CURRENT_TIMESTAMP),
--('AVIGAIL', 'MUIBA VELAZQUEZ', null, 'VENDEDOR', 'AVIGAIL_AVENTURERA99', '$2a$12$tXrHdUnBtUmbMb15qhBSl.fWDyTUIyzW1wvCZi9jbMLam5M1vW8jC', CURRENT_TIMESTAMP),
--('LUIS FERNANDO', 'GUARDIA MAREÑO', null, 'VENDEDOR', 'LUISFANATIC', '$2a$12$E8H10ujN4PdxMxmCTWTrIOvhMVul2tmC6iJP1jF1jjNp5BnrqiUVu', CURRENT_TIMESTAMP),
--('LUIS', 'ARAUCO', null, 'VENDEDOR', 'LUISPRO', '$2a$12$MIZ0o1Xv1p/xYn2cD2eLDurQC5Vn.DAOXaPdq3gFVo51dVXgk/C/a', CURRENT_TIMESTAMP),
--('ABAD', 'MARTINEZ', null, 'VENDEDOR', 'ABADMASTER', '$2a$12$6JREezyqyC/OJ6tV.0srLu6xo/043w14QZU/GC2dZBChxu2jXA7yq', CURRENT_TIMESTAMP),
--('ADHEMAR', 'ALBA FERNANDEZ', null, 'VENDEDOR', 'ADHEMARCREATIVO', '$2a$12$rMZi3NzTYGDbfvbkvEzGo.7OabCDmebaWbjiUCctm2kbwFMcsu0va', CURRENT_TIMESTAMP),
--('FRANKLIN', 'CHAMBI', null, 'VENDEDOR', 'FRANKLIN88', '$2a$12$1iaUoi6lIFSfFtpZwCY.Ae7tZhgrFpIPKf79PT5APphEZKyFviAG6', CURRENT_TIMESTAMP),
--('JUAN JOSE', 'LINO CHAMBI', null, 'VENDEDOR', 'JUAN_MUSICO', '$2a$12$ixvb35mphhr4M28LWfhWy.uDtEgPoazpmAt3dvr57u0elHBb75CU2', CURRENT_TIMESTAMP),
--('MARCO', 'RAMIREZ YUCRA', null, 'VENDEDOR', 'MARCO_INQUIETO', '$2a$12$9I7mZYmotoMgm738xjpcauhPBWysONYWxr1QpyT1J30pkur9nEewC', CURRENT_TIMESTAMP);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombres VARCHAR(150) COLLATE "C" NOT NULL,
    apellidos VARCHAR(150) COLLATE "C" NOT NULL,
    perfil VARCHAR(20) NULL,
    usuario VARCHAR(100) COLLATE "C" UNIQUE NOT NULL,
    contraseña VARCHAR(200) COLLATE "C" NOT NULL,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, fecha_registro)
VALUES 
('EDUARDO', 'CASTRO RUIZ', 'ADMINISTRADOR', 'EDUARDOVIAJERO23', '$2a$12$MH66.Ob.fy.MnPqmeKLfeOorQBnvHBIT/WATlOYO4Az4uPKwucwy2', CURRENT_TIMESTAMP),
('LAURA', 'REA GOMEZ', 'VENDEDOR', 'LAURA_BAILARINA87', '$2a$12$CFiGLNSND74ge9degzYmte9DrmDmJ1utuFM0cim0EcyfRBeTaHU2y', CURRENT_TIMESTAMP),
('AVIGAIL', 'MUIBA VELAZQUEZ', 'VENDEDOR', 'AVIGAIL_AVENTURERA99', '$2a$12$tXrHdUnBtUmbMb15qhBSl.fWDyTUIyzW1wvCZi9jbMLam5M1vW8jC', CURRENT_TIMESTAMP),
('LUIS FERNANDO', 'GUARDIA MAREÑO', 'VENDEDOR', 'LUISFANATIC', '$2a$12$E8H10ujN4PdxMxmCTWTrIOvhMVul2tmC6iJP1jF1jjNp5BnrqiUVu', CURRENT_TIMESTAMP),
('LUIS', 'ARAUCO', 'VENDEDOR', 'LUISPRO', '$2a$12$MIZ0o1Xv1p/xYn2cD2eLDurQC5Vn.DAOXaPdq3gFVo51dVXgk/C/a', CURRENT_TIMESTAMP),
('ABAD', 'MARTINEZ', 'VENDEDOR', 'ABADMASTER', '$2a$12$6JREezyqyC/OJ6tV.0srLu6xo/043w14QZU/GC2dZBChxu2jXA7yq', CURRENT_TIMESTAMP),
('ADHEMAR', 'ALBA FERNANDEZ', 'VENDEDOR', 'ADHEMARCREATIVO', '$2a$12$rMZi3NzTYGDbfvbkvEzGo.7OabCDmebaWbjiUCctm2kbwFMcsu0va', CURRENT_TIMESTAMP),
('FRANKLIN', 'CHAMBI', 'VENDEDOR', 'FRANKLIN88', '$2a$12$1iaUoi6lIFSfFtpZwCY.Ae7tZhgrFpIPKf79PT5APphEZKyFviAG6', CURRENT_TIMESTAMP),
('JUAN JOSE', 'LINO CHAMBI', 'VENDEDOR', 'JUAN_MUSICO', '$2a$12$ixvb35mphhr4M28LWfhWy.uDtEgPoazpmAt3dvr57u0elHBb75CU2', CURRENT_TIMESTAMP),
('MARCO', 'RAMIREZ YUCRA', 'VENDEDOR', 'MARCO_INQUIETO', '$2a$12$9I7mZYmotoMgm738xjpcauhPBWysONYWxr1QpyT1J30pkur9nEewC', CURRENT_TIMESTAMP);

--select * from usuario;


-- TABLA producto

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(300) COLLATE "C" UNIQUE NOT NULL,
    precio DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
    fecha_elaboracion date not null,
    fecha_vencimiento date not null,
    stock INTEGER not null,
    fecha_registro TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    id_categoria INTEGER REFERENCES categoria(id_categoria),
    id_medida INTEGER REFERENCES medida(id_medida)
); 


INSERT INTO producto (nombre_producto, precio, fecha_elaboracion, fecha_vencimiento, stock, fecha_registro, id_categoria, id_medida)
VALUES 
('QUESO MOZZARELLA', 10, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 1, 1),
('QUESO CHEDDAR', 12, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 1, 1),
('CREMA MOZZARELLA', 8, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 4, 1),
('CREMA CHEDDA', 8, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 4, 1),
('MANTEQUILLA MENONA CON SAL', 7, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 3, 1),
('MANTEQUILLA MENONA SIN SAL', 7, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 3, 1),
('RECORTES DE CHEDDAR', 6, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 5, 1),
('YOGURT DE FRESA', 10, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 2, 2),
('YOGURT DE VAINILLA', 10, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 2, 2),
('YOGURT DE DURAZNO', 10, '2022-04-20', '2022-10-20', 10, CURRENT_TIMESTAMP, 2, 2);

--select * from producto; 


-- TABLA compra

CREATE TABLE compra (
    id_compra SERIAL PRIMARY KEY,
    monto_compra DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
    fecha_compra TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    id_proveedor INTEGER REFERENCES proveedor(id_proveedor),
    id_usuario INTEGER REFERENCES usuario(id_usuario)
); 

INSERT INTO compra (monto_compra, fecha_compra, id_proveedor, id_usuario)
VALUES 
(920, '2023-01-05', 1, 1),
(160, '2023-02-10', 2, 1),
(200, '2023-03-15', 3, 1),
(200, '2023-04-01', 5, 1),
(560, '2023-01-25', 1, 1),
(70, '2023-02-25',  8, 1),
(105, '2023-03-05', 4, 1),
(170, '2023-01-10', 6, 1),
(100, '2023-04-02', 10, 1),
(150, '2023-02-20', 9, 1);

--select * from compra; 


-- TABLA detalle_compra

--CREATE TABLE detalle_compra (
--    id_compra INTEGER REFERENCES compra(id_compra),
--    id_producto INTEGER REFERENCES producto(id_producto)
--    cantidad_producto INTEGER not null
--    precio_compra DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
--    PRIMARY KEY (id_compra, id_producto)
--); 

CREATE TABLE detalle_compra (
    id_compra INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad_producto INTEGER NOT NULL,
    precio_compra DECIMAL(10, 2),
    PRIMARY KEY (id_compra, id_producto),
    CONSTRAINT fk_compra FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

INSERT INTO detalle_compra (id_compra, id_producto, cantidad_producto, precio_compra)
VALUES 
(1, 2,  50, 12),
(1, 3, 40, 8),
(2, 3, 20, 8),
(3, 9, 10, 10),
(3, 8, 10, 10),
(4, 3, 25, 8),
(5, 1, 20, 10),
(5, 2, 30, 12),
(6, 6, 10, 7),
(7, 5, 15, 7),
(8, 4, 10, 8),
(8, 7, 15, 6),
(9, 9, 10, 10),
(10, 1, 10, 10),
(10, 8, 5, 10);


--select * from detalle_compra; 


-- TABLA venta

CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    monto_venta DECIMAL(10, 2) NULL, -- Cambiado a tipo DECIMAL
    fecha_venta TIMESTAMP NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    id_cliente INTEGER REFERENCES cliente(id_cliente),
    id_usuario INTEGER REFERENCES usuario(id_usuario)
); 

INSERT INTO venta (monto_venta, fecha_venta, id_cliente, id_usuario)
VALUES 
(36, '2023-01-06', 1, 2),
(24, '2023-03-10', 2, 3),
(70, '2023-04-10', 3, 4),
(24, '2023-05-20', 4, 5),
(44, '2023-06-08', 5, 6),
(21, '2023-07-01',  6,7),
(14, '2023-02-11', 7, 8),
(38, '2023-09-14', 8, 9),
(20, '2023-09-20', 9, 10),
(30, '2023-09-30', 10, 2);

--select * from venta;


-- TABLA detalle_venta

--CREATE TABLE detalle_venta (
--    id_venta INTEGER REFERENCES venta(id_venta),
--    id_producto INTEGER REFERENCES producto(id_producto),
--   cantidad_producto INTEGER NOT NULL,
--    precio_venta DECIMAL(10, 2) NULL,
--    PRIMARY KEY (id_venta, id_producto)
--);


CREATE TABLE detalle_venta (
    id_venta INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad_producto INTEGER NOT NULL,
    precio_venta DECIMAL(10, 2),
    PRIMARY KEY (id_venta, id_producto),
    CONSTRAINT fk_venta FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

INSERT INTO detalle_venta (id_venta, id_producto, cantidad_producto, precio_venta)
VALUES 
(1, 1,  2, 10),
(1, 3, 2, 8),
(2, 3, 3, 8),
(3, 9, 4, 10),
(3, 8, 3, 10),
(4, 3,  3, 8),
(5, 1, 2, 10),
(5, 2, 2, 12),
(6, 6, 3, 7),
(7, 5, 2, 7),
(8, 4, 1, 8),
(8, 7, 5, 6),
(9, 9, 2, 10),
(10, 1, 1, 10),
(10, 8, 2, 10);


--select * from detalle_venta; 
