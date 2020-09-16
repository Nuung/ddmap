'user strict'

const { dev } = require('../database/db_info');

const mysql_dbc = require('../database/db_con')(); 

const connection = mysql_dbc.init(); 
mysql_dbc.test_open(connection); 

const User = function(user){
    this.id = User.id;
    this.profile_icon = User.profile_icon; 
    this.nic_name = User.nic_name; 
    this.gender = User.gender;
    this.password = User.password
}

User.signUP = function(newUser, result){
    connection.query("INSERT INTO " , newUser, function (err, res){
        if(err){
            console.log("error_userAccount_Signup " , err); 
            result(err, null); 
        }else{
            console.log("success_userAccount_Signup ")
            result(newUser, null); 
        }
    } );
};

