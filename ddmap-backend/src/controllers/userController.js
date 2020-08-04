'use strict'

const Task = require('../models/User')

//post, get 
exports.post_user_account = function(req, res){
    Task.postAccount(function(err, task){
        
    })
}
