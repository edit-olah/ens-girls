pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract AddressBook {

    struct domainName {
        address addr;
        string domain;
        string _type;
        string description;
    }

    domainName[] exchangeBook;
    domainName[] minerBook;
    domainName[] userBook;
    domainName[] dappBook;
    domainName[] tokenBook;

    //registerName(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, "test.eth", "Test data", "User");


    //register address as a domain
    function registerName(address _newAddress, string dName, string _despriction, string __type)  returns (uint256) {

        if(compareStrings(__type, "User")){
             userBook.push(domainName(_newAddress, dName, __type,_despriction ));
             return userBook.length;
         } else if(compareStrings(__type, "Exchange")){
             exchangeBook.push(domainName(_newAddress, dName, __type,_despriction ));
             return exchangeBook.length;
         }else if(compareStrings(__type, "Miner")){
             minerBook.push(domainName(_newAddress, dName, __type,_despriction ));
             return minerBook.length;
         }else if(compareStrings(__type, "Token")){
             tokenBook.push(domainName(_newAddress, dName, __type,_despriction ));
             return tokenBook.length;
         } else if(compareStrings(__type, "Dapp")){
             dappBook.push(domainName(_newAddress, dName, __type,_despriction ));
             return dappBook.length;
        } else {
            return 0;

        }


    }

    //search for all domians and addresses of a certain type
    function searchByIndex(uint256 index, string __type) returns (address, string, string, string) {
        if(compareStrings(__type, "User")){
             return (userBook[index].addr, userBook[index].domain, userBook[index]._type, userBook[index].description);
         } else if(compareStrings(__type, "Exchange")){
             return (exchangeBook[index].addr, exchangeBook[index].domain, exchangeBook[index]._type, exchangeBook[index].description);
         }else if(compareStrings(__type, "Miner")){
             return (minerBook[index].addr, minerBook[index].domain, minerBook[index]._type, minerBook[index].description);
         }else if(compareStrings(__type, "Token")){
             return (tokenBook[index].addr, tokenBook[index].domain, tokenBook[index]._type, tokenBook[index].description);
         } else if(compareStrings(__type, "Dapp")){
             return (dappBook[index].addr, dappBook[index].domain, dappBook[index]._type, dappBook[index].description);
        } else {

        }
    }


    function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }

}
