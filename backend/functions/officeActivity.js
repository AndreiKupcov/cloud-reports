const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const OFFICE_ACTIVITY_TABLE_NAME = process.env.OFFICE_ACTIVITY_TABLE_NAME;


// {
//     "author": "pkozub",
//     "name": "akupcov",
//     "date": "2019-10-15",
//     "time": "9:20",
//     "type": "IN"
// }
router.post("", (req, res) => {
    let {name, date, time, type, author} = req.body;
    const item = {
        id: uuidv4(),
        name, date, time, type, author,
        timestamp: Date.now()
    };


    const params = {
        TableName: OFFICE_ACTIVITY_TABLE_NAME,
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
