// 미들웨어를 사용한 router  
const express = require('express'); 

const {isLoggedIn, isNotLoggedIn} = requrire('./middlewares'); 

const router = express.Router(); 

router.get('/profile' , isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - ', user: req.uesr}); 
}); 

//loggedin 화면 주기 
router.get('/join', isNotLoggedIn , (req, res) => {
    res.render('join', {
        title: '회원가입',
        user: req.user, 
        joinError: req.flash('joinError'),
    });
}); 

router.get('/', (req, res, next) => {
    res.render('main', {
        title: 'nodeBird', 
        twits: [],
        user: req.user, 
        loginError: req.flash('loginError'), 
    });
}); 

module.exports = rotuer; 

