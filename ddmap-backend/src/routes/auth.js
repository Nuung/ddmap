const express = require('express'); 
const passport = require('passport'); 
const bcrypt = require('bcrypt'); 
const {isLoggedIn, isNotLoggedIn } = require('./middlewares'); 
const { User } = require('../../models/User'); 
const multer = require('multer'); 

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) =>{
    const {id, profile_icon, nic_name, gender, password} = req.body; 

    try{
        //동기성을 보장하기 위해서 await--> 동기가 보장 되어야 exUser가 에러나지 않음 
        const exUser = await User.findOne({where: {email}}); 
        
        if(exUser){
            req.flash('joinError', '이미 가입된 이메일 입니다. '); 
            return res.redirect('/join'); 
        }

        const hash = await bcrypt.hash(password, 12);
        // image 파일 데이터로 전송 
        await User.create({
            id,
            profile_icon,
            nic_name,
            gender,
            password: hash,
        }); 
        
        return res.redirect('/'); 
    }catch( error){
        console.error(error); 
        return next(error); 
    }

//login 
});
router.post('/login', isNotLoggedIn, (req,res,next) =>{
    passport.authenticate('local', (authError, user, info) =>{
        if(authError){
            console.error(authError); 
            return next(authError); 
        }

        if(!user){
            req.flash('loginError' , info.message); 
            return res.redirect('/'); 
        }

        return req.login(user, (loginError) =>{
            if(loginError){
                console.error(loginError); 
                return next(loginError); 
            }

            return res.redirect('/'); 
        });
    })(req, res, next);
}); 

router.get('logout', isLoggedIn, (req,res) =>{
    req.logout(); 
    req.session.destory(); 
    res.redirect('/'); 

});


router.get('/kakao', passport.authenticate('kakao')); 

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req , res) =>{
    res.redirect('/');
});

module.exports = router; 
