var express = require('express')
var bodyParser = require('body-parser')
var parseString = require('xml2js').parseString; 
var app = express();
 
var tagNameProcessor = function(name) {
    console.dir('tagName: ' + name);
}
var attrNameProcessor = function(name) {
    console.dir('attrName: ' + name);
}
var valueProcessor = function(name) {
    console.dir('value: ' + name);
}
var attrValueProcessor = function(name) {
    console.dir('attrValue: ' + name);
}


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/xml' }));
 
// parse application/json 
app.use(bodyParser.json());
 
//app.use(function (req, res) {
//    console.log('Recieved: ' + req.headers['content-type'] );
//    parseString(req.body, { explicitArray : false}, function(err, result) {
//        console.dir(JSON.stringify(result));
//    res.sendStatus(200);
//    });
//    console.dir(parseString(req.body,{ explicitArray : false, ignoreAttrs : true }));
//    console.dir(JSON.stringify(req.body, null, 2));
//  res.setHeader('Content-Type', 'text/plain')
//  res.write('you posted:\n')
//  res.end(JSON.stringify(req.body, null, 2))
//})

app.post('/idoc', function (req, res) {
    parseString(req.body, { tagNameProcessors: [tagNameProcessor],
                            attrNameProcessors: [attrNameProcessor],
                            valueProcessors: [valueProcessor],
                            attrValueProcessors: [attrValueProcessor],
                            explicitArray : false}, 
                            function(err, result) {
        var crmTrans = result.CRMXIF_ORDER_SAVE_M02.IDOC.E101CRMXIF_BUSTRANS;
        
        var oppt = {
            _Id : crmTrans.OBJECT_ID,
            postingDate : crmTrans.POSTING_DATE,
            description : crmTrans.DESCRIPTION,
            createdBy : crmTrans.CREATED_BY,
            expRevenue : crmTrans.E101CRMXIF_OPPORTUNITY_X.E101CRMXIF_OPPORTUNITY.EXP_REVENUE,
            startDate : crmTrans.E101CRMXIF_OPPORTUNITY_X.E101CRMXIF_OPPORTUNITY.STARTDATE,
            expectEnd : crmTrans.E101CRMXIF_OPPORTUNITY_X.E101CRMXIF_OPPORTUNITY.EXPECT_END,
            userProbability : crmTrans.E101CRMXIF_OPPORTUNITY_X.E101CRMXIF_OPPORTUNITY.PROBABILITY,
            sysProbability : crmTrans.E101CRMXIF_OPPORTUNITY_X.E101CRMXIF_OPPORTUNITY.SYS_PROBABILITY,
            status : crmTrans.E101CRMXIF_STATUS_XT.E101CRMXIF_STATUS[1].TXT30
        };
        
        
        //console.dir(JSON.stringify(oppt));
        console.dir(JSON.stringify(result.CRMXIF_ORDER_SAVE_M02));
        console.dir(req.body);
    res.sendStatus(200);
    });
});

app.get('/idoc',function(req, res){
    res.sendStatus(200);
});


app.listen(8725,function() {
    console.log('listening on port 8725 \n');
});




