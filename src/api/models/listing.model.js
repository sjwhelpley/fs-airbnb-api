var mysqlConn = require("../../database/database");

module.exports = class Listing {
    constructor(homeType, address, maxNumPeople, title, summary, pricePerNight) {
        this.id;
        this.homeType = homeType;
        this.address = address;
        this.maxNumPeople = maxNumPeople;
        this.title = title;
        this.summary = summary;
        this.pricePerNight = pricePerNight;
        this.id_provider;
    }
    
    // GET
    getAll(result) {
        mysqlConn.query("SELECT * FROM listing", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    getById(id, result) {
        mysqlConn.query("SELECT * FROM listing WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // CREATE
    create(newListing, result) {
        mysqlConn.query("INSERT INTO listing set ?", newListing, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });      
    }

    // UPDATE
    update(id, listing, result) {
        var params = [listing.homeType, listing.address, listing.maxNumPeople, listing.title, listing.summary, listing.pricePerNight, id];
        mysqlConn.query("UPDATE listing SET homeType = ?, address = ?, maxNumPeople = ?, title = ?, summary = ?, pricePerNight = ? WHERE id = ?", params, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    // DELETE
    delete(id, result) {
        mysqlConn.query("DELETE FROM listing WHERE id = ?", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
}

