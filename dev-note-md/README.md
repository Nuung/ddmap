# mysql ~ ORM 시퀼라이즈 

# 그에 맞는 프로젝트 구조 ~ controller / service / models ~ entity

# api 명세 도구 Swagger (스웨거)
- [동빈나짱](https://youtu.be/akbdsrOpQ60)
    - https://youtu.be/ARi-cXdIIj8 이걸 보고 코드 수술 가자 

# Server Status Code 
- https://developer.mozilla.org/ko/docs/Web/HTTP/Status 


</br>

------------

</br>

# Sequelize

> ORM,,,, 개빡친다,,,, 약간 오버엔지니어링이라는 생각이 든다...

## sprint1

- entity 폴더로 분리하고 기본적으로 나눠 놓은 캡슐라이징 패턴을 이해하는데에 좀 걸렸다.

- index에서 object db를 기본적으로 전역으로 사용하되 export db해서 Model에서는 그 db에 속해있는 여러 entity중 하나만 가져오는 형식
    - 그래서 경로를 바꾸는 작업 [commit 확인](https://github.com/Nuung/DDmap/commit/7bd186bb81b539c7042e142d34e364bb5513d40d) 에서 바뀐 경로 때매 해맸다.. 401 무한반복의 세계,, 

- 더 빡치는 점은 관계 설정이다. 개애애애빡친다 그냥,, sql 쿼리로는 암만봐도 맞는데 왜 계속 Error Code: 3780. Referencing column ... throw를 한다. 토나온다 ㅋㅋ
    ~~~~sql

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
    ~~~~
    
    위 아래 차이를 솔직히 모르겠다 (물론 외래키 설정 CACADE 같은 것을 말하는게 아니다,, 왜 위는 되고 아래는 절대 안되냐는 말이다)

    ~~~~sql

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

    ~~~~