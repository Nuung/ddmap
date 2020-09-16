'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

 sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

//create database using schema, if tables not exists 

db.User = require('./User.entitiy')(sequelize,Sequelize); 
db.Reviews = require('./Reviews')(sequelize, Sequelize);
db.Bookmark = require('./Bookmark')(sequelize, Sequelize);
db.Toilet = require('./Toilet.entity')(sequelize, Sequelize);
db.Reports = require('./Reports')(sequelize, Sequelize);
db.Rank = require('./Rank')(sequelize , Sequelize); 


//define db relation
// db and reviews 1:n 관계 
db.User.hasMany(db.Reviews); 
db.Reviews.belongsTo(db.User);

// toilet and reviews 1:n add toilet id column in Reviews  
db.Toilet.hasMany(db.Reviews); 
db.Reviews.belongsTo(db.Toilet); 

// review and report  1:n add review id  
db.Reviews.hasMany(db.Reports);
db.Reports.belongsTo(db.Reviews); 

// toilet and rank 1:1
db.Rank.belongsTo(db.Toilet);

// 1:N user and bookmark 
db.User.hasMany(db.Bookmark); 
db.Bookmark.belongsTo(db.User);

// 1 : 1 Bookmark and toilet 
db.Bookmark.belongsTo(db.Toilet); 


module.exports = db;
