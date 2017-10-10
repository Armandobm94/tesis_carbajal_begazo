var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require("mongojs").ObjectId;
var db = mongojs("mongodb://chat:chat@ds153494.mlab.com:53494/chatbot_db", ["incidentes", "personal", "ranking", "sistema"]);

router.get('/incidente', (req, res) => {
  db.incidentes.find((err, docs) => {
    res.send(docs);
  });
});

router.post("/incidente", (req, res) => {
  db.incidentes.insert(req.body.incidente, (err, doc) => {
    res.send(doc);
  })
});

router.get('/incidente/:id', (req, res) => {
  db.incidentes.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, (err, docs) => {
    res.send(docs);
  });
});

module.exports = router;
