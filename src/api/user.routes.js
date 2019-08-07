const express = require('express');
const router = express.Router();

const User = require('./models/user.model');
const UploadService = require('./services/upload.service');

// GET
router.get("/", (req, res) => {
    User.prototype.getAllUsers((err, result) => {
        if(err) res.status(400).json({ msg: err.message });
        res.send(result);
    });
});

router.get("/:id", (req, res) => {
    User.prototype.getUserById(req.params.id, (err, result) => {
        if(err) res.status(400).json({ msg: err.message });
        res.send(result);
    });
});

// CREATE
router.post("/", (req, res) => {
    User.prototype.createUser(req.body, (err, result) => {
        if(err) res.status(400).json({ msg: err.message });
        res.send(result);
    });
});

router.post("/image/:userId", (req, res) => {
    UploadService.prototype
      .upload(req, res)
      .then(() => {
        const userId = req.params.userId;
        const url = "http://localhost:5000/uploads/" + req.file.filename;
   
        User.prototype
          .updateUserImageById(userId, url, (err, result) => {
            if(err) res.status(400).json({ msg: err.message });
            res.send(result);
        });
      })
      .catch(err => {
        res.status(400).json({ msg: err });
      });
}); 

// UPDATE
router.post("/update/:id", (req, res) => {
    User.prototype.updateUser(req.params.id, req.body, (err, result) => {
        if(err) res.status(400).json({ msg: err.message });
        res.send(result);
    });
});

// DELETE
router.get("/delete/:id", (req, res) => {
    User.prototype.deleteUser(req.params.id, (err, result) => {
        if(err) res.status(400).json({ msg: err.message });
        res.send(result);
    });
});

module.exports = router;