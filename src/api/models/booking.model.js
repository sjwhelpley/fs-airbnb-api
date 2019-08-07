var mysqlConn = require("../../database/database");

module.exports = class Booking {
    constructor(numPeople, startDate, endDate, id_listing, id_consumer, status) {
        this.id;
        this.numPeople = numPeople;
        this.totalCost = totalCost;
        this.startDate = startDate;
        this.endDate = endDate;
        this.id_listing = id_listing;
        this.id_consumer = id_consumer;
        this.status = status;
    }

    // GET
    getAll(result) {
        mysqlConn.query("SELECT * FROM booking", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getById(id, result) {
        mysqlConn.query("SELECT * FROM booking WHERE id = ? ", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getByUserId(id, result) {
        mysqlConn.query("SELECT * FROM booking WHERE id_user = ? ", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getByListingId(id, result) {
        mysqlConn.query("SELECT * FROM booking WHERE id_listing = ? ", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getByListingIdStatus(id, status, result) {
        mysqlConn.query("SELECT * FROM booking WHERE id_listing = ? AND status = ?", [id, status], function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // CREATE
    create(newBooking, result) {
        mysqlConn.query("INSERT INTO booking SET ?", newBooking, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });      
    }

    // UPDATE
    update(id, booking, result) {
        mysqlConn.query("UPDATE booking SET booking = ? WHERE id = ?", [booking, id], function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    updateStatus(id, newStatus, result) {
        var params = [newStatus, id];
        mysqlConn.query("UPDATE booking SET status = ? WHERE id = ?", params, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // DELETE
    delete(id, result) {
        mysqlConn.query("DELETE FROM booking WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
}









