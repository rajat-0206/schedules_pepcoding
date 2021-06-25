-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2021 at 08:10 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scheduler`
--

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `teacherId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `batch`, `date`, `teacherId`, `createdAt`, `updatedAt`) VALUES
(1, 'Class 2', '2021-10-06', 1, '2021-06-22 20:28:24', '2021-06-22 20:28:24'),
(4, 'Class 12', '2021-06-18', 1, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(5, 'Class 3', '2021-06-11', 1, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(6, 'Class 4', '2021-06-10', 2, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(7, 'Class 5', '2021-06-10', 3, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(8, 'Class 1', '2021-06-11', 3, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(9, 'Class 7', '2021-06-13', 4, '2021-06-22 20:38:15', '2021-06-22 20:38:15'),
(12, 'class 7', '2021-10-06', 2, '2021-06-23 15:54:33', '2021-06-23 15:54:33'),
(13, 'class 7', '2021-04-06', 2, '2021-06-23 15:55:21', '2021-06-23 15:55:21'),
(14, 'class 7', '2021-05-06', 2, '2021-06-23 18:48:41', '2021-06-23 18:48:41'),
(15, 'class 7', '2021-05-06', 4, '2021-06-24 17:32:15', '2021-06-24 17:32:15'),
(16, 'mycrobites', '2021-06-03', 1, '2021-06-24 17:52:11', '2021-06-24 17:52:11'),
(17, 'mycrobites', '2021-06-03', 4, '2021-06-24 17:52:30', '2021-06-24 17:52:30'),
(18, 'kya hai yh', '2002-06-01', 3, '2021-06-24 17:54:10', '2021-06-24 17:54:10'),
(20, 'Celebration', '2021-08-04', 1, '2021-06-24 20:12:58', '2021-06-24 20:12:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherId` (`teacherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
