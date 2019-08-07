var ListingImgUrl = require("../models/listing-imgurl-mapping.model");

module.exports = class ListingImgUrlService {
    constructor() { }

    // GET
    getAll() { 
        return new Promise((resolve, reject) => {
            ListingImgUrl.prototype.getAll((err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            ListingImgUrl.prototype.getById(id, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }

    // CREATE
    create(newListingImgUrl) { 
        return new Promise((resolve, reject) => {
            ListingImgUrl.prototype.create(newListingImgUrl, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }

    // UPDATE
    update(id) { 
        return new Promise((resolve, reject) => {
            ListingImgUrl.prototype.update(id, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }

    // DELETE
    delete(id) { 
        return new Promise((resolve, reject) => {
            ListingImgUrl.prototype.delete(id, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}