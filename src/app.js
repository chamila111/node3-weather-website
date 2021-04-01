const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');



const app = express();
//define paths for express config
const dpath = path.join(__dirname,'../public');
const viewpath = path.join(__dirname,'../templates/views');
const partialpath = path.join(__dirname,'../templates/partials');
//set up handlebars engine views location
hbs.registerPartials(partialpath);
app.set('views',viewpath);
app.set('view engine','hbs');



//setup ststic directory to serve
app.use(express.static(dpath));
app.get('',(req,res) => {
  res.render('index',{
    title:'weather app',
    name:'chamila gunathilake'
  })
})
app.get('/about',(req,res) => {
  res.render('about',{
    title:'about page',
    name:"chamila gunathilake"
  })
})
app.get('/help',(req,res) => {
  res.render('help',{
    title:'help page',
    name:"chamila gunathilake",
    message:"help is here ,if you need it any time"
  })
})



app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'provide an address'
    })
  }
  geo(req.query.address,(err,{lat,long,location} = {}) => {
    if(err){
      return res.send({
        err,
      })
    }

    forecast(lat,long,(error,forecastdata) => {
     if(error){
       return res.send({
         error,
       })
     }
       res.send({
         location,
         forecast:forecastdata,
         address:req.query.address
       })

    })
})
})




app.get('/products',(req,res) => {

  if(!req.query.search){
  return res.send({
    err:'must enter a valid search term'
  });
  }
  console.log(req.query)
  res.send({
    products:[]
  })
})
//404 page
app.get('/help/*',(req,res) => {
  res.render('404',{
    title:'404',
    name:'chamila gunathilake',
    errmessage:'help found not the rest'
  })
})
 app.get('*',(req,res) =>{
   res.render('404',{
     title:'404',
     name:'chamila gunathilake',
     errmessage:'no page found'
  })
 })
app.listen(3000,() =>{
  console.log('listening at port 3000');

})
