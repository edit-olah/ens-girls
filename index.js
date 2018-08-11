var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
var ENS = require('ethereum-ens');
var ENSArtifacts = require('./build/contracts/ENSRegistry.json');
var ENSContract = TruffleContract(ENSArtifacts);
var web3 = new Web3();

var provider = new Web3.providers.HttpProvider('http://localhost:8545');
web3.setProvider(provider);
ENSContract.setProvider(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357");

console.log(web3.eth.accounts[0])
var ens = new ENS(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357");
//console.log(ENSContract.address)

var address = ens.resolver('ethlab.eth').addr().then(function(addr) { 
    console.log(addr)
}).catch(error => {
    console.log("error getting address", error);
});

const express = require('express')
const app = express()
const path = require('path')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))