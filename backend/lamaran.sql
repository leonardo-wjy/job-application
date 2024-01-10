-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 05:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lamaran`
--

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `posisi` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `no_ktp` varchar(16) NOT NULL,
  `tempat_tanggal_lahir` varchar(255) NOT NULL,
  `agama` enum('Islam','Kristen Protestan','Kristen Katolik','Hindu','Budha','Konghucu','Lainnya') NOT NULL,
  `golongan_darah` enum('A','B','AB','O') NOT NULL,
  `status` enum('Belum Menikah','Menikah','Cerai','Janda','Duda') NOT NULL,
  `alamat_ktp` text NOT NULL,
  `alamat_tinggal` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_telp` varchar(255) NOT NULL,
  `orang_terdekat` varchar(255) NOT NULL,
  `skill` longtext NOT NULL,
  `bersedia_penempatan` enum('Ya','Tidak') NOT NULL,
  `penghasilan_harapan` int(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`id`, `user_id`, `posisi`, `nama`, `no_ktp`, `tempat_tanggal_lahir`, `agama`, `golongan_darah`, `status`, `alamat_ktp`, `alamat_tinggal`, `email`, `no_telp`, `orang_terdekat`, `skill`, `bersedia_penempatan`, `penghasilan_harapan`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'www (confirm)', 'aaa', '2222222222222222', 'a', 'Kristen Katolik', 'A', 'Menikah', 'a', 'a', 'a@gmail.com', '02188217671722', 'ahmad, 018281721772', '- a\n- b', 'Ya', 5000000, '2024-01-10 22:05:19', '2024-01-10 22:54:43', '2024-01-10 22:49:24'),
(2, 1, 'www (confirm)', 'aaa', '2222222222222222', 'a', 'Kristen Katolik', 'A', 'Menikah', 'a', 'a', 'a@gmail.com', '02188217671722', 'ahmad, 018281721772', '- a\n- b', 'Ya', 5000000, '2024-01-10 22:51:16', '2024-01-10 22:54:43', NULL),
(3, 3, 'Web Developer (Confirm)', 'Tes', '1212212121434455', 'Jakarta, 23 November 2000', 'Kristen Protestan', 'A', 'Menikah', 'a', 'a', 'test123@gmail.com', '08182172177', 'Tina, 0817271818288', '-a\n-b', 'Tidak', 6000000, '2024-01-10 22:56:06', '2024-01-10 22:56:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('User','Admin') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'test@gmail.com', '4297f44b13955235245b2497399d7a93', 'User', '2024-01-10 10:08:20', '0000-00-00 00:00:00'),
(2, 'admin@gmail.com', '4297f44b13955235245b2497399d7a93', 'Admin', '2024-01-10 10:49:12', '2024-01-10 10:49:12'),
(3, 'test123@gmail.com', '4297f44b13955235245b2497399d7a93', 'User', '2024-01-10 11:17:08', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
