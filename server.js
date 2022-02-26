import * as coin from "./modules/coin.mjs";
import minimist from "minimist";
import express from "express";


const args = minimist(process.argv.slice(2));
args['port'];

const app = express();
const port = args.port || process.env.PORT || 5000;


const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port));
})


app.get('/app/', (req, res) => {
    res.statusCode = 200; 
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
});


app.get('/app/flip/', (req, res) => {
    let flip = coin.coinFlip();
    res.status(200).json({ "flip": flip });
});

app.get('/app/flips/:number', (req, res) => {
    let raw = coin.coinFlips(req.params.number);
    let summary = coin.countFlips(raw);
    res.status(200).json({ "raw": raw, "summary": summary });
});


app.get('/app/flip/call/heads', (req, res) => {
    let heads = coin.flipACoin('heads');
    let call = heads.call;
    let flip = heads.flip;
    let result = heads.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
});


app.get('/app/flip/call/tails', (req, res) => {
    let tails = coin.flipACoin('tails');
    let call = tails.call;
    let flip = tails.flip;
    let result = tails.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
});



app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND');
    res.type("text/plain");
});