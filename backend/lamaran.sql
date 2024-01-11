-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2024 at 05:53 AM
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
(1, 1, 'Sales (confirm)', 'Andi', '2222222222222222', 'a', 'Kristen Katolik', 'A', 'Menikah', 'a', 'a', 'a@gmail.com', '02188217671722', 'ahmad, 018281721772', '- a\n- b', 'Ya', 5000000, '2024-01-10 22:05:19', '2024-01-10 22:54:43', '2024-01-10 22:49:24'),
(2, 1, 'Sales (confirm)', 'Andi', '2222222222222222', 'a', 'Kristen Katolik', 'A', 'Menikah', 'a', 'a', 'a@gmail.com', '02188217671722', 'ahmad, 018281721772', '- a\n- b', 'Ya', 5000000, '2024-01-10 22:51:16', '2024-01-10 22:54:43', NULL),
(3, 3, 'Web Developer (OK)', 'Toni', '2222222222222222', 'a', 'Kristen Protestan', 'AB', 'Cerai', 'tes', 'tes', 'a@gmail.com', '0817217271727', 'tes', '- a', 'Ya', 5000000, '2024-01-10 22:56:06', '2024-01-11 11:51:01', '2024-01-10 22:56:30'),
(4, 3, 'Web Developer (OK)', 'Toni', '2222222222222222', 'a', 'Kristen Protestan', 'AB', 'Cerai', 'tes', 'tes', 'a@gmail.com', '0817217271727', 'tes', '- a', 'Ya', 5000000, '2024-01-11 11:44:40', '2024-01-11 11:51:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pekerjaan`
--

CREATE TABLE `pekerjaan` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `perusahaan` varchar(255) NOT NULL,
  `posisi` varchar(255) NOT NULL,
  `pendapatan` varchar(255) NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pekerjaan`
--

INSERT INTO `pekerjaan` (`id`, `user_id`, `perusahaan`, `posisi`, `pendapatan`, `tahun`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'PT. Anak Bangsa Indonesia', 'Web Developer', '5900000', '2020 - 2023\r\n', '2024-01-11 08:56:35', '2024-01-11 08:56:35', NULL),
(7, 3, 'PT. A (Confirm)', 'web dev', '5,900,000 IDR', '2020', '2024-01-11 11:51:01', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pelatihan`
--

CREATE TABLE `pelatihan` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `sertifikat` varchar(255) NOT NULL,
  `tahun` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelatihan`
--

INSERT INTO `pelatihan` (`id`, `user_id`, `nama`, `sertifikat`, `tahun`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Coursera', 'www.google.com', '2020', '2024-01-11 08:44:07', '2024-01-11 08:44:07', NULL),
(7, 3, 'kursus A (Confirm)', 'ada', '2020', '2024-01-11 11:51:01', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pendidikan`
--

CREATE TABLE `pendidikan` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `jenjang_pendidikan` varchar(255) NOT NULL,
  `institusi` varchar(255) NOT NULL,
  `jurusan` varchar(255) NOT NULL,
  `tahun_lulus` varchar(255) NOT NULL,
  `ipk` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendidikan`
--

INSERT INTO `pendidikan` (`id`, `user_id`, `jenjang_pendidikan`, `institusi`, `jurusan`, `tahun_lulus`, `ipk`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'SMA', 'Yayasan Kita Peduli', 'IPA', '2015', 'A', '2024-01-11 08:31:49', '2024-01-11 08:31:49', NULL),
(7, 3, 'SMA (Confirm)', 'ABC', 'Teknik Sipil', '2022', '3.88', '2024-01-11 11:51:01', '0000-00-00 00:00:00', NULL);

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
-- Indexes for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelatihan`
--
ALTER TABLE `pelatihan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendidikan`
--
ALTER TABLE `pendidikan`
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
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pelatihan`
--
ALTER TABLE `pelatihan`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pendidikan`
--
ALTER TABLE `pendidikan`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
