var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var parseText = bodyParser.text();

//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.route('/')
   .post(parseText, function(request, response){
//    var newBlock = request.body;
//    blocks[newBlock.name] = newBlock.description;
//    response.status(201).json(newBlock.name);
    
    console.dir(request.body); 
    return response.sendStatus(200);
    });

//router.route('/:name')
//    .all(function(request, response, next) {
//    var name = request.params.name;
//    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
//    request.blockName = block;
//    next();
//    })
//    
//    .get(function(request, response) {
//    var description = blocks[request.blockName];
//
//    if (!description){
//        response.status(404).json('No description found for ' + request.params.name);
//    } else {
//      response.json(description);  
//    }})
//    
//    .delete(function(request, response) {
//    delete blocks[request.blockName];
//    response.sendStatus(200);
//    });
//





module.exports = router;