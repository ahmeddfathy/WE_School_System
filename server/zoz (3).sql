-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2024 at 10:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zoz`
--

-- --------------------------------------------------------

--
-- Table structure for table `absence`
--

CREATE TABLE `absence` (
  `student_id` varchar(255) DEFAULT NULL,
  `date_of_absence` text DEFAULT '',
  `date_of_delay` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`student_id`, `date_of_absence`, `date_of_delay`) VALUES
('general10.1', '', 2),
('general10.2', '', 0),
('Web11.1', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`email`, `password`, `role`) VALUES
('ahmedfathi@gmail.com', '123456', 'admin'),
('ahmed@f.com', '123456', 'studentaffairs'),
('bb@gmail.com', '12345678', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `competitions`
--

CREATE TABLE `competitions` (
  `student_id` varchar(255) DEFAULT NULL,
  `name_of_competition` varchar(255) DEFAULT NULL,
  `rank` int(11) DEFAULT 0,
  `date_of_competition` date DEFAULT NULL,
  `joined` varchar(255) DEFAULT 'before'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delay_absence`
--

CREATE TABLE `delay_absence` (
  `student_id` varchar(255) DEFAULT NULL,
  `date_of_delay` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delay_absence`
--

INSERT INTO `delay_absence` (`student_id`, `date_of_delay`) VALUES
('general10.1', '2024-01-05,2023-12-11'),
('general10.2', ''),
('Web11.1', '');

-- --------------------------------------------------------

--
-- Table structure for table `final`
--

CREATE TABLE `final` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formative1`
--

CREATE TABLE `formative1` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative1`
--

INSERT INTO `formative1` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.2', 40, 2, 'ss', 's', 50, 's', 's', 's', 'ss', 'physics', 'ss', 'sss', 'ss'),
('Web11.1', 40, 2, 's', 's', 50, 'ee', 'pass', '30', '20', 'physics', 'sss', 'ss', 's'),
('Web11.1', 10, 2, '10', '2', 100, 'kep', 'dd', 'dd', 'dd', 'math', 'sml', 'dmd', 'slm'),
('general10.1', 30, 2, 'd', 'd', 100, 'ee', 'pass', '20', 'w', 'physics', 'ss', 's', 's'),
('Web11.1', 10, 20, 's', 's', 10, 's', 'ss', 's', 's', 'math', 's', 's', 'ss');

-- --------------------------------------------------------

--
-- Table structure for table `formative2`
--

CREATE TABLE `formative2` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative2`
--

INSERT INTO `formative2` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'arabic', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'math', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]');

-- --------------------------------------------------------

--
-- Table structure for table `formative3`
--

CREATE TABLE `formative3` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative3`
--

INSERT INTO `formative3` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('Web11.1', 30, 2, 'ث', 'ي', 40, 'dd', 'dd', 'dd', 'd', 'physics', 'ss', 'ss', 'ss');

-- --------------------------------------------------------

--
-- Table structure for table `formative4`
--

CREATE TABLE `formative4` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative4`
--

INSERT INTO `formative4` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('general10.2', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'religion', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'religion', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'religion', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'arabic', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]');

-- --------------------------------------------------------

--
-- Table structure for table `formative5`
--

CREATE TABLE `formative5` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative5`
--

INSERT INTO `formative5` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]');

-- --------------------------------------------------------

--
-- Table structure for table `formative6`
--

CREATE TABLE `formative6` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative6`
--

INSERT INTO `formative6` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]');

-- --------------------------------------------------------

--
-- Table structure for table `formative7`
--

CREATE TABLE `formative7` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative7`
--

INSERT INTO `formative7` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]');

-- --------------------------------------------------------

--
-- Table structure for table `formative8`
--

CREATE TABLE `formative8` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formative8`
--

INSERT INTO `formative8` (`student_id`, `Num_Of_Questions`, `T`, `W`, `NA`, `Percentage`, `FinalEvaluation`, `StudentCase`, `num_of_competenceis`, `num_of_competency_questions`, `subject_name`, `Competency_Assessments`, `The_NA_in_competencies`, `The_W_in_competencies`) VALUES
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('web11.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.1', 10, 10, '10', '10', 10, 'Pass', 'ممتاز', '16', '16', 'physics', 'ee , ee , me , ee', '[[3,4]]', '[[1,2] , [10,12]]'),
('general10.2', 40, 2, 'a;la', 'ss', 50, 'ee', 'pass', '30', 'dd', 'dd', 'dd', 'dd', 'dd');

-- --------------------------------------------------------

--
-- Table structure for table `optimization`
--

CREATE TABLE `optimization` (
  `student_id` varchar(255) NOT NULL,
  `Formative` varchar(255) DEFAULT NULL,
  `Subjects` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parent_info`
--

CREATE TABLE `parent_info` (
  `student_id` varchar(255) NOT NULL,
  `parent_name` varchar(255) DEFAULT NULL,
  `parent_email` varchar(255) DEFAULT NULL,
  `parent_phone` varchar(20) DEFAULT NULL,
  `id_card` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_info`
--

INSERT INTO `parent_info` (`student_id`, `parent_name`, `parent_email`, `parent_phone`, `id_card`) VALUES
('general10.1', 'fathi', 'ahmeddfathy087@gmail.com', '01122881061', 0x433a5c66616b65706174685c53637265656e73686f7420323032332d30332d3132203030323430322e706e67),
('general10.2', 'fthiii', 'am3288435@gmail.com', '01122881051', 0x433a5c66616b65706174685c57494e5f32303233303331315f31395f32375f34385f50726f2e6a7067),
('Web11.1', 'mustafa', 'belalmoustafa65@gmail.com', '01122881061', 0x433a5c66616b65706174685c57494e5f32303233313130395f31345f35305f32385f50726f2e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `student_id` varchar(255) DEFAULT NULL,
  `date_of_permission` date DEFAULT NULL,
  `note` text DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school_info`
--

CREATE TABLE `school_info` (
  `student_id` varchar(255) NOT NULL,
  `class` char(2) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `absence` int(11) DEFAULT NULL,
  `delays` int(11) DEFAULT NULL,
  `permissions` int(11) DEFAULT NULL,
  `competitions` int(11) DEFAULT NULL,
  `violations` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_info`
--

INSERT INTO `school_info` (`student_id`, `class`, `grade`, `specialization`, `absence`, `delays`, `permissions`, `competitions`, `violations`) VALUES
('general10.1', '1E', '10', 'general', 2, 14, 0, 0, 14),
('general10.2', '1A', '10', 'general', 0, 0, 0, 0, 0),
('Web11.1', '2F', '11', 'Web', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `semifinal`
--

CREATE TABLE `semifinal` (
  `student_id` varchar(255) NOT NULL,
  `Num_Of_Questions` int(11) DEFAULT NULL,
  `T` int(11) DEFAULT NULL,
  `W` varchar(255) DEFAULT NULL,
  `NA` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL,
  `num_of_competenceis` varchar(255) DEFAULT NULL,
  `num_of_competency_questions` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `Competency_Assessments` varchar(255) DEFAULT NULL,
  `The_NA_in_competencies` varchar(255) DEFAULT NULL,
  `The_W_in_competencies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE `student_info` (
  `student_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birth_certificate` longblob DEFAULT NULL,
  `middle_school_certificate` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`student_id`, `name`, `phone`, `email`, `religion`, `gender`, `nationality`, `date_of_birth`, `address`, `birth_certificate`, `middle_school_certificate`) VALUES
('general10.1', 'Ahmed Fathi Ramdan', '01122881061', '123456789@giza6.moe.edu.eg', 'muslim', 'male', 'Egypt', '2006-01-04', 'zawya', 0x433a5c66616b65706174685c53637265656e73686f7420323032332d30332d3132203030323333382e706e67, 0x433a5c66616b65706174685c53637265656e73686f7420323032332d30332d3132203030323335332e706e67),
('general10.2', 'zeyad tarek', '01122881061', 'trendsdomyat48@student.com', 'muslim', 'male', 'Egypt', '2007-02-06', 'zawya', 0x433a5c66616b65706174685c57494e5f32303233313130395f31345f35305f32385f50726f2e6a7067, 0x433a5c66616b65706174685c57494e5f32303233303331315f31395f32375f34385f50726f2e6a7067),
('Web11.1', 'belal', '01122881061', 'belalmoustafa65@student.com', 'muslim', 'male', 'Egypt', '2006-02-01', '130 aledkhar', 0x433a5c66616b65706174685c57494e5f32303233313130395f31345f35305f32385f50726f2e6a7067, 0x433a5c66616b65706174685c57494e5f32303233313130395f31345f35305f32385f50726f2e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `top_student`
--

CREATE TABLE `top_student` (
  `student_id` varchar(255) NOT NULL,
  `Formative` varchar(255) DEFAULT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `Percentage` int(11) DEFAULT NULL,
  `FinalEvaluation` varchar(255) DEFAULT NULL,
  `StudentCase` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `violations`
--

CREATE TABLE `violations` (
  `student_id` varchar(255) DEFAULT NULL,
  `name_of_violation` varchar(255) DEFAULT NULL,
  `date_of_violation` date DEFAULT NULL,
  `note` text DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `violations`
--

INSERT INTO `violations` (`student_id`, `name_of_violation`, `date_of_violation`, `note`, `name`) VALUES
('general10.1', 'delay', '2024-01-12', 'ahmed', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-11', 'aaa', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-09', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-08', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-01', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-02', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2024-01-05', 'sss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-30', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-29', 'sss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-28', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-26', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-24', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-23', 'ss', 'Ahmed Fathi Ramdan'),
('general10.1', 'delay', '2023-12-11', 'sss', 'Ahmed Fathi Ramdan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absence`
--
ALTER TABLE `absence`
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `competitions`
--
ALTER TABLE `competitions`
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `delay_absence`
--
ALTER TABLE `delay_absence`
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `final`
--
ALTER TABLE `final`
  ADD KEY `Final_student_id_idx` (`student_id`);

--
-- Indexes for table `formative1`
--
ALTER TABLE `formative1`
  ADD KEY `Formative1_student_id_idx` (`student_id`);

--
-- Indexes for table `formative2`
--
ALTER TABLE `formative2`
  ADD KEY `Formative2_student_id_idx` (`student_id`);

--
-- Indexes for table `formative3`
--
ALTER TABLE `formative3`
  ADD KEY `Formative3_student_id_idx` (`student_id`);

--
-- Indexes for table `formative4`
--
ALTER TABLE `formative4`
  ADD KEY `Formative5_student_id_idx` (`student_id`);

--
-- Indexes for table `formative5`
--
ALTER TABLE `formative5`
  ADD KEY `Physics_student_id_idx` (`student_id`);

--
-- Indexes for table `formative6`
--
ALTER TABLE `formative6`
  ADD KEY `Formative6_student_id_idx` (`student_id`);

--
-- Indexes for table `formative7`
--
ALTER TABLE `formative7`
  ADD KEY `Formative7_student_id_idx` (`student_id`);

--
-- Indexes for table `formative8`
--
ALTER TABLE `formative8`
  ADD KEY `Formative8_student_id_idx` (`student_id`);

--
-- Indexes for table `optimization`
--
ALTER TABLE `optimization`
  ADD KEY `Optimization_student_id_idx` (`student_id`);

--
-- Indexes for table `parent_info`
--
ALTER TABLE `parent_info`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `school_info`
--
ALTER TABLE `school_info`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `semifinal`
--
ALTER TABLE `semifinal`
  ADD KEY `SemiFinal_student_id_idx` (`student_id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `top_student`
--
ALTER TABLE `top_student`
  ADD KEY `Top_Student_student_id_idx` (`student_id`);

--
-- Indexes for table `violations`
--
ALTER TABLE `violations`
  ADD KEY `student_id` (`student_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `competitions`
--
ALTER TABLE `competitions`
  ADD CONSTRAINT `competitions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `delay_absence`
--
ALTER TABLE `delay_absence`
  ADD CONSTRAINT `delay_absence_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `final`
--
ALTER TABLE `final`
  ADD CONSTRAINT `Religion_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `final_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative1`
--
ALTER TABLE `formative1`
  ADD CONSTRAINT `Specialty_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative1_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative2`
--
ALTER TABLE `formative2`
  ADD CONSTRAINT `Arabic_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative2_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative3`
--
ALTER TABLE `formative3`
  ADD CONSTRAINT `English_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative3_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative4`
--
ALTER TABLE `formative4`
  ADD CONSTRAINT `Math_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative4_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative5`
--
ALTER TABLE `formative5`
  ADD CONSTRAINT `Physics_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative5_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative6`
--
ALTER TABLE `formative6`
  ADD CONSTRAINT `Social_Studies_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative6_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative7`
--
ALTER TABLE `formative7`
  ADD CONSTRAINT `Economy_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative7_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `formative8`
--
ALTER TABLE `formative8`
  ADD CONSTRAINT `Auto_Cad_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `formative8_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `optimization`
--
ALTER TABLE `optimization`
  ADD CONSTRAINT `Optimization_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `optimization_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `parent_info`
--
ALTER TABLE `parent_info`
  ADD CONSTRAINT `parent_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `school_info`
--
ALTER TABLE `school_info`
  ADD CONSTRAINT `school_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `semifinal`
--
ALTER TABLE `semifinal`
  ADD CONSTRAINT `Practical_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `semifinal_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `top_student`
--
ALTER TABLE `top_student`
  ADD CONSTRAINT `Top_Student_student_info_fk` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`),
  ADD CONSTRAINT `top_student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);

--
-- Constraints for table `violations`
--
ALTER TABLE `violations`
  ADD CONSTRAINT `violations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_info` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
