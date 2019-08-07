const User = require('../models/user.model');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = class AuthService {
    constructor() { }

    // REGISTER
    registerUser(user) {
        return new Promise((resolve, reject) => {
            User.prototype.getAllUsers((err, data) => {
                if (err) reject(err);

                data.forEach(existingUser => {
                    if(existingUser.email === user.email) {
                        reject(new Error("Email already in use"));
                    }
                });
            });
            
            bcrypt.hash(user.password, 10, (err, hash) => {
                if(err) reject(err);
    
                const userObj = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    cellPhone: user.cellPhone,
                    email: user.email,
                    password: hash
                };

                User.prototype.createUser(userObj, (err, res) => {
                    if(err) reject(err);
                    const user = {
                        id: res,
                        userObj
                    }

                    const jwt = this.getJwtToken(user, true);
                    const authRes = {
                        user: user,
                        jwt: jwt
                    }
                    resolve(authRes);
                });
            });
        });
    }

    registerProvider(user) {
        return new Promise((resolve, reject) => {
            User.prototype.getAllProviders((err, data) => {
                if (err) reject(err);

                data.forEach(existingUser => {
                    if(existingUser.email === user.email) {
                        reject(new Error("Email already in use"));
                    }
                });
            });

            bcrypt.hash(user.password, 10, (err, hash) => {
                if(err) reject(err);
    
                const userObj = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    cellPhone: user.cellPhone,
                    email: user.email,
                    password: hash
                }

                User.prototype.createProvider(userObj, (err, res) => {
                    if(err) reject(err);
                    const user = {
                        id: res,
                        userObj
                    }

                    const jwt = this.getJwtToken(user, true);
                    const authRes = {
                        user: user,
                        jwt: jwt
                    }
                    resolve(authRes);
                });
            });
        });
    }

    //LOG IN
    loginUser(authUser) {
        return new Promise((resolve, reject) => {
            let email = authUser.email;
            let password = authUser.password;

            User.prototype.getAllUsers((err, data) => {
                if (err) reject(err);
                else {
                    let dbUser = data.filter(user => {
                        return user.email == email;
                    }); 

                    if(dbUser.length == 1) {
                        bcrypt.compare(password, dbUser[0].password).then(res => {
                            if(res == true) {
                                this.getJwtToken(dbUser[0], true).then((token) => {
                                    const authRes = {
                                        user: dbUser[0],
                                        jwt: token
                                    }
                                    resolve(authRes);
                                });  
                            } else {
                                reject(new Error("Incorrect password"));
                            }
                        });        
                    } else {
                        reject(new Error("User does not exist"));
                    }
                }
            });
        });
    }

    loginProvider(authUser) {
        return new Promise((resolve, reject) => {
            let email = authUser.email;
            let password = authUser.password;

            User.prototype.getAllProviders((err, data) => {
                if(err) reject(err);
                else {
                    let dbUser = data.filter(user => {
                        return user.email == email;
                    }); 

                    if(dbUser.length == 1) {
                        bcrypt.compare(password, dbUser[0].password).then(res => {
                            if(res == true) {
                                this.getJwtToken(dbUser[0], true).then((token) => {
                                    const authRes = {
                                        user: dbUser[0],
                                        jwt: token
                                    }
                                    resolve(authRes);
                                });  
                            } else {
                                reject(new Error("Incorrect password"));
                            }
                        });  
                    } else {
                        reject(new Error("User does not exist"));
                    }
                }
            });
        });
    }

    loginAdmin(authUser) {
        return new Promise((resolve, reject) => {
            let email = authUser.email;
            let password = authUser.password;

            User.prototype.getAllAdmins((err, data) => {
                if(err) reject(err);

                let dbUser = data.filter(user => {
                    return user.email == email;
                }); 

                if(dbUser.length == 1) {
                    bcrypt.compare(password, dbUser[0].password).then(res => {
                        if(res == true) {
                            this.getJwtToken(dbUser[0], true).then((token) => {
                                const authRes = {
                                    user: dbUser[0],
                                    jwt: token
                                }
                                resolve(authRes);
                            });  
                        } else {
                            reject(new Error("Incorrect password"));
                        }
                    });      
                } else {
                reject(new Error("User does not exist"));
                }
            });
        });
    }

    async getJwtToken(user, rememberUser) {
        return new Promise((resolve, reject) => {
            let jwtObject = {};

            jwtObject.id = user.id;
            jwtObject.firstName = user.firstName;
            jwtObject.lastName = user.lastName;
            jwtObject.email = user.email;
            jwtObject.cellPhone = user.cellPhone;
            jwtObject.remember = rememberUser;

            jwt.sign(Object.assign({}, jwtObject), "secret-key", {expiresIn: "1d"}, (err, token) => {
                if(err) reject(err);
                resolve(token);
            });
        })
        
    }

    async verifyToken(token) {
        return await jwt.verify(token, "secret-key");
    }
}