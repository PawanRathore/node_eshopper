-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2007 at 07:55 PM
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
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` varchar(5) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `quantity`, `user_id`, `insert_at`, `update_at`) VALUES
(6, 7, '2', 38, '2023-06-18 10:28:29', '2023-06-18 14:00:08'),
(12, 6, '1', 38, '2023-06-18 10:40:38', '2023-06-18 10:40:38'),
(13, 8, '1', 38, '2023-06-18 10:40:47', '2023-06-18 10:40:47'),
(14, 13, '1', 38, '2023-06-18 10:40:53', '2023-06-18 10:40:53'),
(15, 10, '1', 38, '2023-06-18 11:01:26', '2023-06-18 11:01:26');

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
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `status`, `insert_at`, `update_at`) VALUES
(5, 'Mens dresses', '1', '2023-04-23 12:04:16', '2023-04-23 12:04:16'),
(6, 'Womens dresses', '1', '2023-04-23 12:04:46', '2023-04-23 12:04:46'),
(7, 'Babys dresses', '1', '2023-04-23 12:05:07', '2023-04-23 12:05:07'),
(8, 'Accerssories', '1', '2023-04-23 12:05:31', '2023-04-23 12:05:31'),
(9, 'Bags', '1', '2023-04-23 12:07:23', '2023-04-23 12:07:23'),
(10, 'Shoes', '0', '2023-04-23 12:07:33', '2023-04-23 13:51:24'),
(11, 'Boys dresses', '1', '2023-04-24 21:24:11', '2023-04-24 21:24:40'),
(12, 'Girls dresses', '1', '2023-04-24 21:24:53', '2023-04-24 21:24:53');

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
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=38 ;

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
(36, 'pawan', 'undefined', 'undefined', 'undefined', '2023-04-13 20:59:26', '2023-04-13 20:59:26'),
(37, 'test', 'Test8@gmail.com', 'test', 'test', '2023-05-24 22:29:21', '2023-05-24 22:29:21');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(200) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `total` varchar(20) NOT NULL,
  `payment_type` varchar(10) NOT NULL,
  `paymentId` text NOT NULL,
  `inser_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deliver_status` varchar(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `name`, `email`, `mobile`, `address`, `state`, `city`, `pincode`, `total`, `payment_type`, `paymentId`, `inser_at`, `update_at`, `deliver_status`) VALUES
(1, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', 'ujjain', 'MP', 'Ujjain', '456001', '39800', 'paypal', '', '2023-05-21 13:58:13', '2023-05-21 13:58:13', '0'),
(2, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', 'ujjain', 'MP', 'Ujjain', '456001', '39800', 'paypal', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28', '0'),
(3, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '39800', 'paypal', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37', '0'),
(4, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '5600', 'paypal', '', '2023-05-21 14:29:08', '2023-05-21 14:29:08', '0'),
(5, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '5600', 'paypal', '', '2023-05-21 14:41:40', '2023-05-21 14:41:40', '0'),
(6, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '1000', 'paypal', '', '2023-05-21 14:43:43', '2023-05-21 14:43:43', '0'),
(7, '38', 'pawan.', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain.', 'MH', 'Ujjain.', '456001.', '9000', 'paypal', '', '2023-05-21 15:32:23', '2023-05-21 15:32:23', '0'),
(8, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '800', 'paypal', '', '2023-05-21 15:33:16', '2023-05-21 15:33:16', '0'),
(9, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '4400', '', 'pay_LuyvmQMZtusEJM', '2023-05-28 11:50:52', '2023-05-28 11:50:52', '0'),
(10, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '900', '', 'pay_Luz3MZGHM0kBcJ', '2023-05-28 11:58:03', '2023-05-28 11:58:03', '0'),
(11, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '800', '', 'pay_Luz8cdMoWTNE3W', '2023-05-28 12:03:02', '2023-05-28 12:03:02', '0'),
(12, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '800', '', 'pay_LvRSBsWgQsEkHR', '2023-05-29 15:45:02', '2023-05-29 15:45:02', '0'),
(13, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '800', '', 'pay_LvRWIW8IaS1nXG', '2023-05-29 15:48:54', '2023-05-29 15:48:54', '0'),
(14, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '900', '', 'pay_LvRxfm1MVC407n', '2023-05-29 16:14:58', '2023-05-29 16:14:58', '0'),
(15, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '800', '', 'pay_LvSAZtnnb6JZiL', '2023-05-29 16:27:05', '2023-05-29 16:27:05', '0'),
(16, '38', 'pawan', 'e1_rathorepawan13@gmail.com', '8103990731', '47, Bahadur ganj ujjain', 'MP', 'Ujjain', '456001', '20', '', 'pay_LvSbJmVDxTm00K', '2023-05-29 16:52:27', '2023-05-29 16:52:27', '0');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `product_price` varchar(50) NOT NULL,
  `produc_id` varchar(50) NOT NULL,
  `card_item_id` varchar(50) NOT NULL,
  `quantity` varchar(50) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `paymentId` text NOT NULL,
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `product_name`, `product_price`, `produc_id`, `card_item_id`, `quantity`, `order_id`, `user_id`, `paymentId`, `insert_at`, `update_at`) VALUES
(1, 'Colorful Stylish Shirt', '900', '6', '4', '1', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(2, 'One piece', '2000', '8', '7', '4', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(3, 'Girls tops', '800', '9', '8', '5', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(4, 'Men Court', '2500', '10', '9', '3', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(5, 'Women Long coat', '3300', '11', '10', '1', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(6, 'olympus camera', '8000', '13', '11', '2', '2', '38', '', '2023-05-21 14:02:28', '2023-05-21 14:02:28'),
(7, 'Colorful Stylish Shirt', '900', '6', '4', '1', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(8, 'One piece', '2000', '8', '7', '4', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(9, 'Girls tops', '800', '9', '8', '5', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(10, 'Men Court', '2500', '10', '9', '3', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(11, 'Women Long coat', '3300', '11', '10', '1', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(12, 'olympus camera', '8000', '13', '11', '2', '3', '38', '', '2023-05-21 14:21:37', '2023-05-21 14:21:37'),
(13, 'Colorful Stylish Shirt', '900', '6', '13', '2', '4', '38', '', '2023-05-21 14:29:08', '2023-05-21 14:29:08'),
(14, 'Men Truser', '900', '7', '14', '1', '4', '38', '', '2023-05-21 14:29:08', '2023-05-21 14:29:08'),
(15, 'One piece', '2000', '8', '15', '1', '4', '38', '', '2023-05-21 14:29:08', '2023-05-21 14:29:08'),
(16, 'Girls tops', '800', '9', '16', '1', '4', '38', '', '2023-05-21 14:29:08', '2023-05-21 14:29:08'),
(17, 'Colorful Stylish Shirt', '900', '6', '17', '2', '5', '38', '', '2023-05-21 14:41:40', '2023-05-21 14:41:40'),
(18, 'Men Truser', '900', '7', '18', '1', '5', '38', '', '2023-05-21 14:41:40', '2023-05-21 14:41:40'),
(19, 'One piece', '2000', '8', '19', '1', '5', '38', '', '2023-05-21 14:41:40', '2023-05-21 14:41:40'),
(20, 'Girls tops', '800', '9', '20', '1', '5', '38', '', '2023-05-21 14:41:40', '2023-05-21 14:41:40'),
(21, 'Colorful Stylish Shirt', '900', '6', '21', '1', '6', '38', '', '2023-05-21 14:43:43', '2023-05-21 14:43:43'),
(22, 'Men Truser', '900', '7', '22', '1', '7', '38', '', '2023-05-21 15:32:24', '2023-05-21 15:32:24'),
(23, 'olympus camera', '8000', '13', '23', '1', '7', '38', '', '2023-05-21 15:32:24', '2023-05-21 15:32:24'),
(24, 'Shirt', '800', '12', '24', '1', '8', '38', '', '2023-05-21 15:33:16', '2023-05-21 15:33:16'),
(25, 'Men Court', '2500', '10', '25', '1', '9', '38', 'pay_LuyvmQMZtusEJM', '2023-05-28 11:50:52', '2023-05-28 11:50:52'),
(26, 'Colorful Stylish Shirt', '900', '6', '26', '1', '9', '38', 'pay_LuyvmQMZtusEJM', '2023-05-28 11:50:52', '2023-05-28 11:50:52'),
(27, 'Men Truser', '900', '7', '27', '1', '9', '38', 'pay_LuyvmQMZtusEJM', '2023-05-28 11:50:52', '2023-05-28 11:50:52'),
(28, 'Colorful Stylish Shirt', '900', '6', '28', '1', '10', '38', 'pay_Luz3MZGHM0kBcJ', '2023-05-28 11:58:03', '2023-05-28 11:58:03'),
(29, 'Girls tops', '800', '9', '30', '1', '11', '38', 'pay_Luz8cdMoWTNE3W', '2023-05-28 12:03:02', '2023-05-28 12:03:02'),
(30, 'Girls tops', '800', '9', '1', '1', '12', '38', 'pay_LvRSBsWgQsEkHR', '2023-05-29 15:45:02', '2023-05-29 15:45:02'),
(31, 'Girls tops', '800', '9', '2', '1', '13', '38', 'pay_LvRWIW8IaS1nXG', '2023-05-29 15:48:54', '2023-05-29 15:48:54'),
(32, 'Men Truser', '900', '7', '3', '1', '14', '38', 'pay_LvRxfm1MVC407n', '2023-05-29 16:14:58', '2023-05-29 16:14:58'),
(33, 'Girls tops', '800', '9', '4', '1', '15', '38', 'pay_LvSAZtnnb6JZiL', '2023-05-29 16:27:06', '2023-05-29 16:27:06'),
(34, 'One piece', '20', '8', '5', '1', '16', '38', 'pay_LvSbJmVDxTm00K', '2023-05-29 16:52:27', '2023-05-29 16:52:27');

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
  `staus` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = active, 0= disable',
  `insert_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=armscii8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount_price`, `description`, `color`, `size`, `category`, `product_image`, `staus`, `insert_at`, `update_at`) VALUES
(6, 'Colorful Stylish Shirt', '9', '8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '', '11', 'product-2.jpg', 1, '2023-04-24 21:09:08', '2023-05-29 16:49:29'),
(7, 'Men Truser', '9', '6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '5', 'product-3.jpg', 1, '2023-04-24 21:12:37', '2023-05-29 16:49:31'),
(8, 'One piece', '20', '18', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '6', 'product-4.jpg', 1, '2023-04-24 21:14:08', '2023-05-29 16:49:33'),
(9, 'Girls tops', '800', '5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '12', 'product-5.jpg', 1, '2023-04-24 21:15:20', '2023-05-29 16:49:38'),
(10, 'Men Court', '2500', '23', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '5', 'product-6.jpg', 1, '2023-04-24 21:16:24', '2023-05-29 16:49:40'),
(11, 'Women Long coat', '3300', '31', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '6', 'product-7.jpg', 1, '2023-04-24 21:17:37', '2023-05-29 16:49:42'),
(12, 'Shirt', '800', '7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '5', 'product-8.jpg', 1, '2023-04-24 21:18:44', '2023-05-29 16:49:45'),
(13, 'olympus camera', '8000', '7500', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis ullamcorper velit sed ullamcorper morbi. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. ', '', '', '8', 'cat-4.jpg', 1, '2023-04-24 21:32:38', '2023-04-24 21:32:38');

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
  `city` varchar(500) NOT NULL,
  `state` varchar(50) NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `insert_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_id_unique` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email_verified`, `reg_from`, `profile_id`, `email`, `password`, `profile_pic`, `mobile`, `address`, `land_mark`, `pincode`, `city`, `state`, `ip`, `insert_at`, `update_at`) VALUES
(27, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', '', '', 'rathorepawan131@gmail.com', 'Pawan@123', 'aod_issue.png', '8103990731', 'Address 1', '', '456003', '', '', NULL, '2022-01-13 14:56:51', '2022-12-18 14:07:48'),
(32, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', 'google', '102762971708438226003', 'rathorepawan13@gmail.com', '', 'https://lh3.googleusercontent.com/a-/AOh14GgQ6bSya3TecPHPlHDNPy_eaqBK7MVwnVUwHZJX=s96-c', '8103990731', 'Address 1', '', '456003', '', '', NULL, '2022-01-18 09:07:51', '2022-12-18 14:07:48'),
(35, 'Client Guardian First Name Client Guardian Middle Name Client Guardian Last Name', '', 'facebook', '4694423153926053', 'p.rathore.13.2@gmail.com', '', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4694423153926053&height=200&width=200&ext=1645166100&hash=AeRcrIp8d6oRyO3gKWs', '8103990731', 'Address 1', '', '456003', '', '', NULL, '2022-01-19 06:35:00', '2022-12-18 14:07:48'),
(36, 'Pawan Rathore', '', '', '', 'test', 'test', 'profile_image-1678806005087.png', '810399073', 'Address 1', '', '456001', '', '', NULL, '2022-12-13 14:39:43', '2023-03-14 15:00:05'),
(38, 'pawan', '', 'eshopper', '', 'e1_rathorepawan13@gmail.com', '789', '', '8103990731', '47, Bahadur ganj ujjain', '', '456001', 'Ujjain', 'MP', NULL, '2023-03-16 15:43:40', '2023-05-21 10:03:16');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
