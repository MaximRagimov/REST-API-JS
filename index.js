const express = require('express');
const fs = require('fs');
const generate = require('./lib/generate');
const app = express();
const port = 3000;

let data;

app.get('/generate', (req, res) => {
    const { num, id } = generate();
    data[id] = num;

    fs.writeFileSync('data.json', JSON.stringify(data));

    res.send({
        num,
        id,
    })
})

app.get('/retrieve', (req, res) => {
    const id = req.query.id;

    if (data[id]) {
        res.send(String(data[id]));
    } else {
        res.send('No such number with current id');
    }
    
})

app.listen(port, () => {
    try {
        const buff = fs.readFileSync('data.json');
        data = JSON.parse(buff);
    } catch {
        data = {};
    }

    console.log(`Example app listening on port ${port}`)
})

