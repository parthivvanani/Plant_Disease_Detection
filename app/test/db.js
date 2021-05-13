/*jshint esversion:8*/
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/auth.config');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const { create } = require('../models/user.model');

const userOneId = new mongoose.Types.ObjectId();

const createUser = () => {
    // const t = await jwt.sign( { _id: userOneId }, config.secret, {expiresIn: 86400 /* 24 hours*/});
    // console.log("Object" + userOneId);
    // console.log("TOken: " + t);
    return {
        _id: userOneId,
        username: 'rsr12345',
        email: 'rsr@gmail.com',
        password: '12345678',
        tokens: [
            { token: jwt.sign( { _id: userOneId }, config.secret, {expiresIn: 86400 /* 24 hours*/}) }
        ]
    };
};



const userOne = {
    _id: userOneId,
        username: 'rsr12345',
        email: 'rsr@gmail.com',
        password: '12345678',
        tokens: [
            { token: jwt.sign( { _id: userOneId }, config.secret, {expiresIn: 86400 /* 24 hours*/}) }
        ]
};

const clearDB = async () => {
    await User.deleteMany();
};

const setupDB = async () => {
    await User.deleteMany();
    
    //userOne = await createUser();
    password = await bcrypt.hashSync(userOne.password, 8);

    const roles = ['user', 'admin', 'moderator'];
    usertwo = {
        _id : userOne._id,
        username : userOne.username,
        email: userOne.email,
        password: password,
        // tokens: userOne.tokens
    };

    await new User(usertwo).save((err, user) => {
        if (err) {
          throw new Error(err);
        }
        if (roles) {
          Role.find(
            {
              name: { $in: roles }
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              user.roles = roles.map(role => role._id);
              user.save(err => {
                if (err) {
                    throw new Error(err);
                }
    
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
                throw new Error(err);
            }
    
            user.roles = [role._id];
            user.save(err => {
              if (err) {
                throw new Error(err);
              }
    
            });
          });
        }
      });
};



module.exports = {
    userOneId,
    userOne,
    setupDB,
    clearDB
};