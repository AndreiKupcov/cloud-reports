const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const REPORTS_TABLE_NAME = process.env.REPORTS_TABLE_NAME;


//Create report
router.post("", (req, res) => {
    const item = req.body;

    item.id = uuidv4();
    item.timestamp = Date.now();

    const params = {
        TableName: REPORTS_TABLE_NAME,
        Item: item
    };

    dynamoDb.put(params, error => {
        if (error) {
            console.log(error);
            res.status(400).json({error: "Could not create report"});
        }
        res.json({response: "New report created"});
    });
});

module.exports = router;
