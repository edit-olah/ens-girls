var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
var ENS = require('ethereum-ens');
var ENSArtifacts = require('../build/contracts/ENSRegistry.json');
var ENSContract = TruffleContract(ENSArtifacts);
var web3 = new Web3();

var provider = new Web3.providers.HttpProvider('http://localhost:8545');
web3.setProvider(provider);
ENSContract.setProvider(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357"); //How to get this address at runtime?
var ens = new ENS(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357");

const express = require('express')
const app = express()
const path = require('path')

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static', express.static(__dirname));

app.get('/resolve/:ensname', function (req, res) {
    let ensname = req.params.ensname;
    var address = ens.resolver(ensname).addr().then(function (addr) {
        res.send(addr);
    }).catch(error => {
        console.log("error getting address", error);
        res.send("error");
    });
});

// app.get('/reverse/:address', function (req, res) {
//     let address = req.params.address;
//     var ensName = ens.reverse(ensName).name().then(function (name) {
//         res.send(name);
//     }).catch(error => {
//         console.log("error getting address", error);
//         res.send("error");
//     });
// });

app.listen(3000, () => console.log('ENS Address Book App listening on port 3000!'))