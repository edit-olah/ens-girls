var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
var ENS = require('ethereum-ens');
var ENSArtifacts = require('../build/contracts/ENSRegistry.json');
var ENSContract = TruffleContract(ENSArtifacts);
var web3 = new Web3();
var AddressBookArtifacts = require('../build/contracts/AddressBook.json');
var AddressBookContract = TruffleContract(AddressBookArtifacts);

var provider = new Web3.providers.HttpProvider('http://localhost:8545');
web3.setProvider(provider);
ENSContract.setProvider(provider, "0x2dca3e326418012f2e334d1709a7e430c6edde99"); //How to get this address at runtime?
var ens = new ENS(provider, "0x2dca3e326418012f2e334d1709a7e430c6edde99");
AddressBookContract.setProvider(provider, "0x4cecdcda64ff0fd57bc4ec0ccfc68850453716df"); //How to get this address at runtime?

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

app.get('/reverse/:address', function (req, res) {
    let address = req.params.address;
    var ensName = ens.reverse(address).name().then(function (name) {
        res.send(name);
    }).catch(error => {
        console.log("error getting address", error);
        res.send("error");
    });
});

app.get('/registerName/', async function (req, res) {
    let addressbook = await AddressBookContract.deployed();
    let success = await addressbook.registerName.call(web3.eth.accounts[0], "eth.eth", "Eth company", "Miner");
    console.log("added new entry: ", success)
    res.send(success);
});

app.get('/searchByIndex/', async function (req, res) {
    let addressbook = await AddressBookContract.deployed();
    let result = await addressbook.searchByIndex.call(0, "Miner");
    console.log("got new entry")
    res.json(result)
});

app.listen(3000, () => console.log('ENS Address Book App listening on port 3000!'))