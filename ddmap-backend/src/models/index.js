'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = require('dotenv').config(); //add .env file 
const config = JSON.parse(env.parsed.DB_INFO);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// create database using schema, if tables not exists // table 구조!
db.Toilet = require('./entity/Toilet_entity')(sequelize, Sequelize);
db.User = require('./entity/User_entity')(sequelize, Sequelize); 
db.Reviews = require('./entity/Reviews_entity')(sequelize, Sequelize);

db.User.hasMany(db.Reviews); 
db.Reviews.belongsTo(db.User);

db.Toilet.hasMany(db.Reviews); 
db.Reviews.belongsTo(db.Toilet); 

/*
db.Bookmark = require('./entity/Bookmark_entity')(sequelize, Sequelize);
db.Reports = require('./entity/Reports_entity')(sequelize, Sequelize);
db.Rank = require('./entity/Rank_entity')(sequelize , Sequelize); 

// define db relation
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
*/

module.exports = db;
