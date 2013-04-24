var fs = require('fs');
var express = require("express");
var app = express();
var AWS = require('aws-sdk');
app.use(express.logger());
var acc_key_id;
var sec_acc_key;
var dynamodb;

app.get('/', function(request, response) {
	if(process.env.ACCKEYID){
		acc_key_id=process.env.ACCKEYID;
		sec_acc_key=process.env.SECACCKEY;
		  			dynamodb = new AWS.DynamoDB({
		accessKeyId:acc_key_id,
		secretAccessKey:sec_acc_key,
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
	}else{
		fs.readFile('acc_key_id.txt', 'utf8', function (err,data) {
  			acc_key_id=data;
		});
		fs.readFile('sec_acc_key.txt', 'utf8', function (err,data) {
  			sec_acc_key=data;
  			dynamodb = new AWS.DynamoDB({
		accessKeyId:acc_key_id,
		secretAccessKey:sec_acc_key,
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
		

	}
	
  
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});