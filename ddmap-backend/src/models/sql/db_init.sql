/* [프로시저] 디비 관리 유저 생성 ->  DB 생성 -> 유저에 권한 부여 */
DROP DATABASE IF EXISTS  ddmap;
DROP USER IF EXISTS  ddmap@localhost;
create user ddmap@localhost identified WITH mysql_native_password  by 'ddmap';
create database ddmap;
grant all privileges on ddmap.* to ddmap@localhost with grant option;
commit;

USE ddmap;