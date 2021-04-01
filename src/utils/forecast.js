const request = require('request');
const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f5c2fde5179fdc4dcb8a8f4fc11a786c&query=${lat},${long}&units=f`;
request({url,json:true},(err,{body}) => {
  if(err){
    callback('cant connect to the server',undefined)
  } else if(body.error){
    callback('try another location',undefined)
  }else{
    callback(undefined,`currently the temp is ${body.current.temperature} and it feels like ${body.current.feelslike}`)
  }
})
}
module.exports = forecast;
