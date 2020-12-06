var express = require('express');
var router = express.Router();
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
            res.send(obj);
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
            let lastObj = obj[obj.length-1];
            let newObj = {
                "id": lastObj.id+1,
                "topic": body.topic,
                "desc": body.desc
            };
            obj.push(newObj);
            let json = JSON.stringify(obj);
            fs.writeFile(jsonPath, json, (err) =>{
                if(err){
                    console.log(err);
                }
            });
            res.send(newObj);
        }
    });
});

module.exports = router;
