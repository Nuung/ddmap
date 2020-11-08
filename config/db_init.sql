
/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  ddmap;
DROP USER IF EXISTS  ddmap@localhost;
create user ddmap@localhost identified WITH mysql_native_password  by 'ddmap';
create database ddmap;
grant all privileges on ddmap.* to ddmap@localhost with grant option;
commit;

USE ddmap;

CREATE TABLE toilets (
  id      			VARCHAR(40) PRIMARY KEY,
  name    			VARCHAR(40),
  latitude  		DOUBLE NOT NULL,
  longtitude    	DOUBLE NOT NULL,
  image				VARCHAR(300),
  goo_name			VARCHAR(30),
  dong_name			VARCHAR(30),
  street_num_main	VARCHAR(100), # 광나루로 13길 8
  street_num_sub	VARCHAR(20), # 204
  detail			VARCHAR(40), # etc
  update_date		DATE,
  created_date		DATE
);

CREATE TABLE  users (
  id      	   VARCHAR(40) PRIMARY KEY, # email
  password 	   VARCHAR(300),
  #token        VARCHAR(300),
  profil_icon  VARCHAR(300), # image
  nic_name     VARCHAR(20),
  gender	   tinyint, # 0 1
  created_date DATE
);

CREATE TABLE  reviews (
  id      	   		VARCHAR(40) PRIMARY KEY,
  user_id   	    VARCHAR(40),
  toilet_id    		VARCHAR(40),
  title        		VARCHAR(40),
  latitude 			DOUBLE NOT NULL,
  longtitude    	DOUBLE NOT NULL,  
  image				VARCHAR(300),
  clean_of_toilet 	INTEGER,
  amount_of_tissue 	INTEGER,
  is_old			tinyint,
  is_secret			tinyint,
  short_detail		VARCHAR(40),
  update_date		DATE,
  created_date		DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (toilet_id) REFERENCES toilets(id)
);

# [prefix + A + 1]
CREATE TABLE toilet_rank (
  id      			VARCHAR(60) PRIMARY KEY,
  toilet_id    		VARCHAR(60),
  review_number  	INTEGER,
  review_avg_star   DOUBLE,
  update_date		DATE,
  FOREIGN KEY (toilet_id) REFERENCES toilets(id)
);

CREATE TABLE  bookmark (
  id      	    INTEGER auto_increment PRIMARY KEY,   # 고유
  user_id   	VARCHAR(100),
  toilet_id     VARCHAR(60),
  created_date	DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (toilet_id) REFERENCES toilets(id)
);

CREATE TABLE  report (
  id      	   		  INTEGER auto_increment PRIMARY KEY,  
  report_comment      VARCHAR(300),
  report_user_id      VARCHAR(100),
  reported_user_id    VARCHAR(100),
  report_review_id	  VARCHAR(60),
  reported_date		  DATE,
  reported_clear_date DATE,
  FOREIGN KEY (report_user_id) REFERENCES users(id),
  FOREIGN KEY (reported_user_id) REFERENCES users(id),
  FOREIGN KEY (report_review_id) REFERENCES reviews(id)
);


###########



CREATE TABLE IF NOT EXISTS `toilets` 
(`id` VARCHAR(40) , `name` VARCHAR(100), `latitude` DOUBLE PRECISION NOT NULL, `longitude` DOUBLE PRECISION NOT NULL, 
`image` VARCHAR(200), `goo_name` VARCHAR(40) NOT NULL, `dong_name` VARCHAR(40) NOT NULL, 
`street_num_main` INTEGER NOT NULL, `street_num_sub` INTEGER NOT NULL, `detail` VARCHAR(200), `createdAt` DATETIME NOT NULL, 
`updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `users` (`id` VARCHAR(40) NOT NULL , `salt` VARCHAR(200) NOT NULL, 
`profile_icon` VARCHAR(200), `nic_name` VARCHAR(40) NOT NULL UNIQUE, `gender` TINYINT, `password` VARCHAR(200), 
`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `reviews` 
(`id` VARCHAR(40) , `title` VARCHAR(100), `latitude` DOUBLE NOT NULL, `longitude` DOUBLE NOT NULL, 
`image` VARCHAR(300), `clean_of_toilet` INTEGER NOT NULL, `amount_of_tissue` INTEGER NOT NULL, `is_old` TINYINT NOT NULL, 
`is_secret` TINYINT NOT NULL, `shot_detail` VARCHAR(200), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, 
`userId` VARCHAR(40) NOT NULL, `toiletId` VARCHAR(40) NOT NULL, 
PRIMARY KEY (`id`), 
FOREIGN KEY (`userId`) REFERENCES `users` (`id`), 
FOREIGN KEY (`toiletId`) REFERENCES `toilets` (`id`)) ENGINE=InnoDB;
