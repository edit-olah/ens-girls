var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
var ENS = require('ethereum-ens');
var ENSArtifacts = require('./build/contracts/ENSRegistry.json');
var ENSContract = TruffleContract(ENSArtifacts);
var provider = new Web3.providers.HttpProvider('http://localhost:8545');
var ens = new ENS(provider, '0x20b3c96eb06663ed0dc3d10747707d16bce358de');
var address = ens.resolver('ethlab.eth').addr().then(function(addr) { console.log(addr)});

const express = require('express')
const app = express()
const path = require('path')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))