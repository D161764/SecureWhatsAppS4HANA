app.post('/verifyemployee',(req,res) =>{
  const employeeID = "'"+req.body.empid+"'";
  const empjs = req.body.empid;
  var reqUrl = 'https://devxxxl.hanatrial.ondemand.com/verifyemployee/service/employee.xsodata/employee('+
                employeeID+')?$format=json'; 
  var headers = {
                  'Authorization':    '<base 64 of username:password>',
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

        var otpUrl = 'https://api.authy.com/protected/json/sms/'+authyId;
        var headers = {
          'X-Authy-API-Key':    '<Api key>',
          'Content-Type':     'application/json',
          'Accept': 'application/json'
      };
var options = { method: 'GET',
      url: otpUrl,
      headers: headers 
       };

       request(options, function (error, response, body) {

        if (!error && response.statusCode == 200) { 
          var resultbody = JSON.parse(body);
          var mobile_no = resultbody.cellphone;
                  res.send({
          replies: [{
            type: 'text',
            content: 'Hello, you must have recieved an otp in your registered mobile number '+mobile_no+' Please can you tell me your otp',
          }], 
          conversation: {
            
          }
        })


        }else{

          res.send({
            replies: [{
              type: 'text',
              content: 'There is a problem with your Account, It seems 2FA is not enabled, Please Contact Support Team',
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
            content: 'Well i am enough intelligent to verify who is real employee and who is not',
          }], 
          conversation: {
            memory: { key: 'value' }
          }
        })

        

      }

    })


  

})
