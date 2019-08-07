const express = require('express');
const router = express.Router();

const Booking = require("./models/booking.model");

// GET
router.get("/", (req, res) => {
  Booking.prototype.getAll((err, result) => {
    if(err) res.status(400).json({ msg: err.message });
    res.send(result);
  });
});
  
router.get("/:id", (req, res) => {
  Booking.prototype.getById(req.params.id, (err, result) => {
      if(err) res.status(400).json({ msg: err.message });
      res.send(result);
    });
});

router.get("/user/:id", (req, res) => {
  Booking.prototype.getByUserId(req.params.id, (err, result) => {
      if(err) res.status(400).json({ msg: err.message });
      else res.send(result);
    });
});

router.get("/listing/:id", (req, res) => {
  Booking.prototype.getByListingId(req.params.id, (err, result) => {
      if(err) res.status(400).json({ msg: err.message });
      else res.send(result);
    });
});

router.get("/listing/status/:id/:status", (req, res) => {
  Booking.prototype.getByListingIdStatus(req.params.id, req.params.status, (err, result) => {
      if(err) res.status(400).json({ msg: err.message });
      else res.send(result);
    });
});

// CREATE
router.post("/", (req, res) => {
  Booking.prototype.create(req.body, (err, result) => {
    if(err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.send(result);
    }
  });
});

// UPDATE
router.patch("/update/:id", (req, res) => {
  Booking.prototype.update(req.params.id, req.body, (err, result) => {
    if(err) res.status(400).json({ msg: err.message });
    res.send(result);
  });
});

router.patch("/update/status/:id", (req, res) => {
  Booking.prototype.updateStatus(req.params.id, req.body.status, (err, result) => {
    if(err) res.status(400).json({ msg: err.message });
    else res.send(result);
  });
});

// DELETE
router.get("/delete/:id", (req, res) => {
  Booking.prototype.delete(req.body, (err, result) => {
    if(err) res.status(400).json({ msg: err.message });
    res.send(result);
  });
});

module.exports = router;