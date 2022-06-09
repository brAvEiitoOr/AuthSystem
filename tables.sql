--User
CREATE USER 'bravo-soft'@'localhost' IDENTIFIED BY 'edwinbra';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES, CREATE VIEW, EVENT, TRIGGER, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EXECUTE ON *.* TO 'bravo-soft'@'localhost';

--Database & tables
CREATE DATABASE authProgram;
USE authProgram;
CREATE TABLE `users` (
  `usr_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_lname` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_fname` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_birthday` date NOT NULL,
  `usr_email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_user` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_passw` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `login_log` (
  `ll_id` int(11) NOT NULL,
  `ll_user` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ll_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `reg_log` (
  `rl_id` int(11) NOT NULL,
  `rl_user` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rl_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--keys
ALTER TABLE `login_log`
  ADD PRIMARY KEY (`ll_id`),
  ADD KEY `ll_user` (`ll_user`);
ALTER TABLE `reg_log`
  ADD PRIMARY KEY (`rl_id`),
  ADD KEY `rl_user` (`rl_user`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`usr_id`);
ALTER TABLE `login_log`
  MODIFY `ll_id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `reg_log`
  MODIFY `rl_id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE reg_log ADD FOREIGN KEY (rl_user) REFERENCES users(usr_id);
ALTER TABLE login_log ADD FOREIGN KEY (ll_user) REFERENCES users(usr_id);