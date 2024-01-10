-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 11:30 AM
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
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`id`, `user_id`, `posisi`, `nama`, `no_ktp`, `tempat_tanggal_lahir`, `agama`, `golongan_darah`, `status`, `alamat_ktp`, `alamat_tinggal`, `email`, `no_telp`, `orang_terdekat`, `skill`, `bersedia_penempatan`, `penghasilan_harapan`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'web developer', 'testing', '2123212321232123', 'Jakarta, 12 Mei 2000', 'Islam', 'A', 'Belum Menikah', 'Jalan A', 'Jalan A', 'test@gmail.com', '082187171778', 'Frislly, 081717218282', '- Mampu menggunakan bahasa pemrograman PHP', 'Ya', 9000000, '2024-01-10 17:25:03', '2024-01-10 17:25:03'),
(2, 3, 'Web Developer', 'tes', '3333333333333333', 'Jakarta, 5 Desember 2002', 'Islam', 'AB', 'Menikah', 'tes', 'tes', 'test@gmail.com', '0828272727272', 'tes', 'tes', 'Ya', 8000000, '2024-01-10 17:14:04', '0000-00-00 00:00:00');

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
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
