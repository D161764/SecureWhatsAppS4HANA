app.post('/verifytoken',(req,res) => {
  const otp = req.body.otp;
 const employeeID = "'"+req.body.empid+"'";
  var reqUrl = 'https://devxxx.hanatrial.ondemand.com/verifyemployee/service/employee.xsodata/employee('+
                employeeID+')?$format=json'; 
  var headers = {
                  'Authorization':    '<Base 64 of username:password>',
                  'Content-Type':     'application/json',
                  'Accept': 'application/json'
              };
  var options = { method: 'GET',
              url: reqUrl,
              headers: headers 
               };

    request(options, function (error, response, body) {

      if (!error && response.statusCode == 200) {
        var resultData = JSON.parse(body);
        var authyId = resultData.d.authyID;
        
  var otpverify = 'https://api.authy.com/protected/json/verify/'+otp+'/'+authyId;
  var headers = {
    'X-Authy-API-Key':    '<APi key>',
    'Content-Type':     'application/json',
    'Accept': 'application/json'
};
var options = { method: 'GET',
url: otpverify,
headers: headers 
 };

 request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    res.send({
      replies: [{
        type: 'text',
        content: 'Hi, now you are verified, now i am allowed to chat with you :-)',
      }], 
      conversation: {
       
      }
    })

  }else{
    res.send({
      replies: [{
        type: 'text',
        content: 'Dont send me wrong otp',
      }], 
      conversation: {
        memory: { key: 'value' }
      }
    })
  }

 })

      } else{

        res.send({
          replies: [{
            type: 'text',
            content: 'Contact your administration to check employee master',
          }], 
          conversation: {
            memory: { key: 'value' }
          }
        })

      }

      
      })





})
