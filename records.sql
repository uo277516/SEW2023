-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2023 a las 17:07:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `records`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` text NOT NULL,
  `apellidos` text NOT NULL,
  `nivel` text NOT NULL,
  `tiempo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `apellidos`, `nivel`, `tiempo`) VALUES
('Natalia', 'Fernandez', 'Fácil', 0),
('Patita', 'Rodriguez', 'Fácil', 0),
('Nuria', 'Riego', 'Fácil', 0),
('Nuria', 'Riego', 'Fácil', 0),
('Aiss', 'Fdez', 'Fácil', 0),
('Nuria', 'Fdez', 'Fácil', 0),
('Perd', 'POl', 'Fácil', 0),
('Perd', 'POl', 'Fácil', 0),
('Plala', 'Plpol', 'Fácil', 15),
('Ayss', 'Oyss', 'Fácil', 12),
('Ayss', 'Oyss', 'Fácil', 12),
('Otra', 'Ape', 'Fácil', 15),
('Ult', 'Xfis', 'Fácil', 24),
('olaola', 'adiosadios', 'Fácil', 23);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
