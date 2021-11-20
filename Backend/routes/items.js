var express = require('express');
var router = express.Router();


var monk = require('monk');
var db = monk ('localhost:27017/tourism');
var collection = db.get('attractions');

router.get('/', function(req, res) {
    collection.find({},function(err, items){
        if (err) throw err;
        res.json(items);
    }); 
});
module.exports = router;