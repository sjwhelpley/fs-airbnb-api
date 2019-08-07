var mysqlConn = require("../../database/database");

module.exports = class User {
    constructor(firstName, lastName, cellPhone, email, password, imgUrl) {
        this.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellPhone = cellPhone;
        this.email = email;
        this.password = password;
        this.imgUrl = imgUrl;
    }

    // GET ALL
    getAllUsers(result) {
        mysqlConn.query("SELECT * FROM user", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getAllProviders(result) {
        mysqlConn.query("SELECT * FROM provider", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getAllAdmins(result) {
        mysqlConn.query("SELECT * FROM admin", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // GET BY ID
    getUserById(id, result) {
        mysqlConn.query("SELECT * FROM user WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getProviderById(id, result) {
        mysqlConn.query("SELECT * FROM provider WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getAdminById(id, result) {
        mysqlConn.query("SELECT * FROM admin WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // CREATE
    createUser(newUser, result) {
        mysqlConn.query("INSERT INTO user SET ?", newUser, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    }

    createProvider(newUser, result) {
        mysqlConn.query("INSERT INTO provider SET ?", newUser, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    }

    // UPDATE
    updateUser(id, user, result) {
        mysqlConn.query("UPDATE user SET user = ? WHERE id = ?", [user, id], function(err, res) { // array of properties
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    updateUserImageById(userId, url, result) {
        mysqlConn.query("UPDATE user SET imgUrl = ? WHERE id = ?", [url, userId], function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    updateProviderImageById(providerId, url, result) {
        mysqlConn.query("UPDATE provider SET imgUrl = ? WHERE id = ?", [url, providerId], function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    updateProvider(id, provider, result) {
        mysqlConn.query("UPDATE provider SET provider = ? WHERE id = ?", [provider, id], function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    // DELETE
    deleteUser(id, result) {
        mysqlConn.query("DELETE FROM user WHERE id = ?", id, function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    deleteProvider(id, result) {
        mysqlConn.query("DELETE FROM provider WHERE id = ?", id, function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
}

    