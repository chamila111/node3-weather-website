const request = require('request')
const geolocation = (address,callback) =>{
  const url = ` https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY2hlcnJ5d2FiYml0IiwiYSI6ImNrbW1tNzJydjFnZ3Myd3J3MTZjZnU4aDMifQ.Vbgzq_sZNbTSSgZoT0RjMQ&limit=1`;
  request({url,json:true},(error,{body}) => {
    if(error){
      callback('no server connection',undefined)
    }else if(body.features.length === 0){
      callback('try a different search term',undefined)
    }else{
      callback(undefined,{
        lat:body.features[0].center[0],
        long:body.features[0].center[1],
        location:body.features[0].place_name
      })
    }
  })
}
module.exports = geolocation;
