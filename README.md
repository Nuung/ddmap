# DDMap
> 모든 화장실에 대한 모든 것, 대똥여지도 - DDMap

###

## Getting Started
- 시작전 Infra / Stack을 체크하고 환경을 먼저 조성해야 합니다. 
	- 기본적으로 nodejs, nginx, env, database 모두 환경 설정이 되어야 합니다.

```bash

git clone https://github.com/Nuung/DDmap.git
cd ddmap-backend
sudo npm install
npm start # before this line, u have to check out the env! like db pass,,, etc

```


###

## Infra / Stack

### AWS EC2 ubuntu 18.0.*
- free tier

### WebServer(EC2)
- nginx
	- test-frontend forwarding
	- /home/ubuntu/projects/ableProject/test-frontend
	- reverse proxy server setting (not yet)

- front-end
	- HTML5, CSS3 with bootstarp
	- vanilla javascript (at first)
	- to react.js (to scale up)

### WebApplicationServer(EC2)
- back-end
	- Nodejs 
		- express, resetAPI

### restfulApi Docs(maybe localhost)
- [swagger](https://github.com/swagger-api/swagger-node)
	- ```npm install -g swagger```
	- https://swagger.io/specification/
- But, local 환경 조성은 나중에 할듯,, 우선 swagger hub를 사용!

### DataBase
- mysql
- mongoDB

### IDE
- Visual Studio Code
	- sftp

### SSH
- putty(just in window)
	- private key: local download folder

### ETC
- github

### Open-source
- Docker (not yet)
- Elasticsearch (not yet)

<p align="center">©copyright ALL Copyrights reserved by Hyeonwoo, Jeong</p>