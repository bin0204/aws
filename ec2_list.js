var AWS = require('aws-sdk');
var fs = require('fs');
//AWS.config.update({accessKeyId: 'my-key', secretAccessKey: 'my-secret'});
AWS.config.update({region: 'ap-northeast-2'});
var ec2 = new AWS.EC2({apiVersion: 'latest'});
var param = {
  DryRun: false

 };

//json data
var request = ec2.describeInstances(param);
request.on('success', function(response) {
    console.log("Success!");
    console.log(response.data.Reservations.length);
    var arr = [];
    for(var item in response.data.Reservations) {
      var instances = response.data.Reservations[item].Instances;
      for (var instance = 0 ; instance < instances.length; instance++) {
        // The square brackets produce a list/array.
        // The curly brackets produce an object with key/value pairs.
        // The list can then be a value of a key/value pair.
        var list_data =
          {
          InstanceType: instances[instance].InstanceType,
          ImageId: instances[instance].ImageId,
          InstanceId: instances[instance].InstanceId,
          KeyName: instances[instance].KeyName,
          PrivateIp: instances[instance].PrivateIpAddress,
          AZ: instances[instance].Placement.AvailabilityZone
        }; // format : 간격을 스페이스 2로
      }
    arr.push(list_data);
    }
    console.log(arr);
    json = JSON.stringify(arr, null, 2); //convert it back to JSON
    fs.writeFile('output.json', json, (err) => {
    if (err) throw err;
        console.log('Data written to file');
    }); //write it back
    }).on('error', function(response) {
        console.log("Error!");
}).send();
