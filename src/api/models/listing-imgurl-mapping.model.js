var mysqlConn = require("../../database/database");

module.exports = class ListingImgUrl {
    constructor(id_listing, imgUrl) {
        this.id;
        this.id_listing = id_listing;
        this.imgUrl = imgUrl;
    }

    // GET
    getAll(result) {
        mysqlConn.query("SELECT * FROM listing_imgurl_mapping", function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    
    getByListingId(id, result) {
        mysqlConn.query("SELECT imgUrl FROM listing_imgurl_mapping WHERE id_listing = ? ", id, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    
    // CREATE
    create(newListingImgUrl, result) {
        let newImgUrl = new ListingImgUrl(newListingImgUrl.id_listing, newListingImgUrl.imgUrl);
        mysqlConn.query("INSERT INTO listing_imgurl_mapping set ?", newImgUrl, function(err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    
    // UPDATE
    update(id, listingImgUrl, result) {
        mysqlConn.query("UPDATE listing_imgurl_mapping SET imgUrl = ? WHERE id_listing = ?", [listingImgUrl, id], function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
    
    // DELETE
    delete(id, result) {
        mysqlConn.query("DELETE FROM listing_imgurl_mapping WHERE id_listing = ?", id, function(err, res) {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
}









