var express = require('express');
var router = express.Router();
var list = require('../public/Resources/todolist');
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var jsonPath = path.join(__dirname, "../public/Resources/todolist.json");
    fs.readFile(jsonPath, 'utf8',function(err, data) {

        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            res.send(JSON.stringify(obj));
        }
    });

});

router.post('/', function (req, res, next) {
    let body = req.body;

    var jsonPath = path.join(__dirname, "../public/Resources/todolist.json");
    fs.readFile(jsonPath, function(err, data) {

        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            let json = JSON.stringify(obj);
            let lastObj = json[json.length-1];
            let newObj = {
                "id": lastObj+1,
                "topic": body.topic,
                "desc": body.desc
            }
            json.append(newObj);

            fs.writeFile('../public/Resources/todolist.json', json);
        }
    });


    res.sendStatus(200)
});

module.exports = router;
