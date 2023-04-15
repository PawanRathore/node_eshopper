-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2023 at 03:15 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eshopper`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `insert_at`, `update_at`) VALUES
(1, 'Pawan', 'admin@gmail.com', 'admin@123', '2023-04-10 20:07:09', '2023-04-10 22:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` text NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=37 ;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `subject`, `message`, `insert_at`, `update_at`) VALUES
(1, 'test', 'rathorepawan13@gmail.com', 'php developer ', 'test', '2023-04-09 11:14:08', '2023-04-09 11:14:08'),
(25, 'Pawan Rathore', 'rathorepawan13_1@gmail.com', 'testing from e-shopper', 'this is testing mail.', '2023-04-09 17:26:14', '2023-04-09 17:26:14'),
(26, 'Pawan Rathore', 'rathorepawan13_2@gmail.com', 'testing from e-shopper', 'this is testing mail.', '2023-04-09 17:27:11', '2023-04-09 17:27:11'),
(31, 'test', 'Test3@gmail.com', 'test', 'tst', '2023-04-09 17:38:10', '2023-04-09 17:38:10'),
(32, 'test', 'Test4@gmail.com', 'test', 'tst', '2023-04-09 17:42:11', '2023-04-09 17:42:11'),
(33, 'test', 'Test5@gmail.com', 'test', 'tst', '2023-04-09 17:42:32', '2023-04-09 17:42:32'),
(34, 'test', 'Test6@gmail.com', 'test', 'tst', '2023-04-09 17:44:09', '2023-04-09 17:44:09'),
(35, 'test', 'Test7@gmail.com', 'test', 'tst', '2023-04-09 17:45:44', '2023-04-09 17:45:44'),
(36, 'pawan', 'undefined', 'undefined', 'undefined', '2023-04-13 20:59:26', '2023-04-13 20:59:26');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `price` varchar(50) NOT NULL,
  `discount_price` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `color` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `product_image` varchar(500) NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount_price`, `description`, `color`, `size`, `category`, `product_image`, `insert_at`, `update_at`) VALUES
(1, 'Product 1', '700', '1000', 'this is test product 1', 'Blue,Red', 'XS,S,M', '1', '', '2023-04-05 21:27:31', '2023-04-05 21:28:37'),
(2, 'Product 2', '800', '1000', 'this is test product 2', 'Green,Red', 'XS,S,M', '1', '', '2023-04-05 21:27:31', '2023-04-05 21:28:31'),
(3, 'Rumal', '30', '20', 'this is test product ', '', '', 'clothes', 'l-bhopal030323041958.jpg', '2023-04-15 18:42:44', '2023-04-15 18:42:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email_verified` varchar(50) NOT NULL,
  `reg_from` varchar(15) NOT NULL,
  `profile_id` varchar(100) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `profile_pic` text NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `address` text,
  `land_mark` text NOT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `insert_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_id_unique` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email_verified`, `reg_from`, `profile_id`, `email`, `password`, `profile_pic`, `mobile`, `address`, `land_mark`, `pincode`, `ip`, `insert_at`, `update_at`) VALUES
(27, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', '', '', 'rathorepawan131@gmail.com', 'Pawan@123', 'aod_issue.png', '8103990731', 'Address 1', '', '456003', NULL, '2022-01-13 14:56:51', '2022-12-18 14:07:48'),
(32, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', 'google', '102762971708438226003', 'rathorepawan13@gmail.com', '', 'https://lh3.googleusercontent.com/a-/AOh14GgQ6bSya3TecPHPlHDNPy_eaqBK7MVwnVUwHZJX=s96-c', '8103990731', 'Address 1', '', '456003', NULL, '2022-01-18 09:07:51', '2022-12-18 14:07:48'),
(35, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', 'facebook', '4694423153926053', 'p.rathore.13.2@gmail.com', '', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4694423153926053&height=200&width=200&ext=1645166100&hash=AeRcrIp8d6oRyO3gKWs', '8103990731', 'Address 1', '', '456003', NULL, '2022-01-19 06:35:00', '2022-12-18 14:07:48'),
(36, 'Pawan Rathore', '', '', '', 'test', 'test', 'profile_image-1678806005087.png', '810399073', 'Address 1', '', '456001', NULL, '2022-12-13 14:39:43', '2023-03-14 15:00:05'),
(38, 'pawan', '', 'eshopper', '', 'e1_rathorepawan13@gmail.com', '789', '', '8103990731', NULL, '', NULL, NULL, '2023-03-16 15:43:40', '2023-04-08 12:39:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
