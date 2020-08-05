
/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  ddmap;
DROP USER IF EXISTS  ddmap@localhost;
create user ddmap@localhost identified WITH mysql_native_password  by 'ddmap';
create database ddmap;
grant all privileges on ddmap.* to ddmap@localhost with grant option;
commit;

USE ddmap;

CREATE TABLE toilet (
  id      			INTEGER PRIMARY KEY,
  name    			VARCHAR(40),
  latitude  		DOUBLE,
  longtitude    	DOUBLE,
  image				VARCHAR(300),
  goo_name			VARCHAR(20),
  dong_name			VARCHAR(20),
  street_num_main	VARCHAR(20),
  street_num_sub	VARCHAR(20),
  detail			VARCHAR(40),
  update_date		DATE
);

CREATE TABLE toilet_rank (
  id      			INTEGER PRIMARY KEY,
  toilet_id    		INTEGER,
  review_number  	INTEGER,
  review_avg_star   DOUBLE,
  FOREIGN KEY (toilet_id) REFERENCES toilet(id)
);

CREATE TABLE  user (
  id      	   INTEGER PRIMARY KEY,  
  token        VARCHAR(300),
  profil_icon  VARCHAR(300),
  nic_name     VARCHAR(20),
  gender	   tinyint,
  password 	   VARCHAR(100)
);

CREATE TABLE  reviews (
  id      	   		INTEGER PRIMARY KEY,  
  toilet_id    		INTEGER,
  title        		VARCHAR(40),
  latitude 			DOUBLE,
  longtitude    	DOUBLE,  
  image				VARCHAR(300),
  clean_of_toilet 	INTEGER,
  amount_of_tissue 	INTEGER,
  is_old			tinyint,
  is_secret			tinyint,
  short_detail		VARCHAR(40),
  update_date		DATE,
  FOREIGN KEY (toilet_id) REFERENCES toilet(id)
);

CREATE TABLE  bookmark (
  id      	    INTEGER auto_increment PRIMARY KEY,  
  user_id   	INTEGER,
  toilet_id     INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (toilet_id) REFERENCES toilet(id)
);

CREATE TABLE  bookmark (
  id      	   		  INTEGER auto_increment PRIMARY KEY,  
  report_comment      VARCHAR(300),
  report_user_id      INTEGER,
  reported_user_id    INTEGER,
  report_review_id	  INTEGER,
  report_date		  DATE,
  FOREIGN KEY (report_user_id) REFERENCES user(id),
  FOREIGN KEY (reported_user_id) REFERENCES user(id),
  FOREIGN KEY (report_review_id) REFERENCES reviews(id)
);