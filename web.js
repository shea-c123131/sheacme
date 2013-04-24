var fileSystem = require('fs');
var express = require("express");
var app = express();
var AWS = require('aws-sdk');
app.use(express.logger());

app.get('/', function(request, response) {
	var dynamodb = new AWS.DynamoDB({
		accessKeyId:ACCKEYID,
		secretAccessKey:SECACCKEY,
		region: 'us-east-1'
	});
	dynamodb.putItem({
		TableName:'nodedb',
		Item:{
			path:{S:'something'},
			time:{N:'1'},
			categories:{S:'e'},
			somet:{S:String(Date.now())}
		}
	}, function(err, data){
		
	});
		dynamodb.getItem({
		TableName:'nodedb',
		Key:{
			path:{S:'something'},
			time:{N:'1'}
		}
	}, function(err, data){
		response.send(data['Item']['somet']['S']);
	});
  
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});