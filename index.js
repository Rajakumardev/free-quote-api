const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
let quoteObj = {};
app.use(cors());
fs.readFile('./db/quotes.json','utf8',(err,data)=>{
    if(err){
        console.log(`quotes db read failed.`);
        throw err;
    }
    quoteObj = JSON.parse(data);
    console.log(`quotes db read successfull.`);
});

app.get('/api',(req,res)=>{
    res.json(quoteObj);
})

app.get('/api/random',(req,res)=>{
    const randomIndex = Math.round(Math.random() * quoteObj.length);
    res.json(quoteObj[randomIndex]);
});

app.get('/api/getTotalQuotesCount',(req,res)=>{
    res.json({
        "count":quoteObj.length
    })
});

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server started on PORT:${PORT}`);
})