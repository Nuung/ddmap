
/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  ddmap;
DROP USER IF EXISTS  ddmap@localhost;
create user ddmap@localhost identified WITH mysql_native_password  by 'ddmap';
create database ddmap;
grant all privileges on ddmap.* to ddmap@localhost with grant option;
commit;

USE ddmap;
CREATE TABLE toilets (
  id      			VARCHAR(60) PRIMARY KEY,
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

# [prefix + A + 1]
CREATE TABLE toilet_rank (
  id      			VARCHAR(60) PRIMARY KEY,
  toilet_id    		VARCHAR(60),
  review_number  	INTEGER,
  review_avg_star   DOUBLE,
  update_date		DATE,
  FOREIGN KEY (toilet_id) REFERENCES toilets(id)
);

CREATE TABLE  users (
  id      	   VARCHAR(100) PRIMARY KEY, # email
  password 	   VARCHAR(300),
  #token        VARCHAR(300),
  profil_icon  VARCHAR(300), # image
  nic_name     VARCHAR(20),
  gender	   tinyint, # 0 1
  created_date DATE
);

CREATE TABLE  reviews (
  id      	   		VARCHAR(60) PRIMARY KEY,
  user_id   	    VARCHAR(100),
  toilet_id    		VARCHAR(60),
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