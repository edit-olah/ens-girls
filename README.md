# ens-girls
ENS Hackathon 2018 London - project

Setup
```
npm install
truffle compile
truffle migrate
```

Once migrated, copy ENSRegistry contract address to index.js 
```
ENSContract.setProvider(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357");
var ens = new ENS(provider, "0x94f68ee4e353903f871b5c3c1346e922ae5cd357");
```


Also, need to add a name to ENS test network, choose one of your existing addresses on ganache

```
truffle exec scripts/ens.js -n ethlab -a 0xc97192f9efc4758e1a44a9f270428fb8ee5f58ac

```

Run app

```
ganache-cli
npm start
```




