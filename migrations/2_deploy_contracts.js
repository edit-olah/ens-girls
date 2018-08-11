var ConvertLib = artifacts.require('./ConvertLib.sol');
var MetaCoin = artifacts.require('./MetaCoin.sol');
const ENS = artifacts.require('@ensdomains/ens/ENSRegistry.sol');
const PublicResolver = artifacts.require('@ensdomains/ens/PublicResolver.sol');
const ReverseRegistrar = artifacts.require('@ensdomains/ens/ReverseRegistrar.sol');
const namehash = require('eth-ens-namehash');
const tld = "eth";
const owner = "0x20b3c96eb06663ed0dc3d10747707d16bce358de";

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.then(() => {
    return deployer
      .deploy(ENS)
      .then(() => {
        return deployer.deploy(PublicResolver, ENS.address);
      })
      .then(() => {
        return deployer.deploy(
          ReverseRegistrar,
          ENS.address,
          PublicResolver.address
        );
      })
      .then(() => {
        return (
          ENS.at(ENS.address)
            // eth
            .setSubnodeOwner(0, web3.sha3(tld), owner, { from: owner })
        );
      })
      .then(() => {
        return (
          ENS.at(ENS.address)
            // reverse
            .setSubnodeOwner(0, web3.sha3('reverse'), owner, { from: owner })
        );
      })
      .then(() => {
        return (
          ENS.at(ENS.address)
            // addr.reverse
            .setSubnodeOwner(
              namehash.hash('reverse'),
              web3.sha3('addr'),
              ReverseRegistrar.address,
              { from: owner }
            )
        );
      });
  });
};
