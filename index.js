const express = require('express')
const app = express()
const port = 3006
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) =>{
  var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('data2.json', 'utf8'));
 res.json(obj)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
