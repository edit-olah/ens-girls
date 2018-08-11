pragma solidity ^0.4.13;

contract AddressBook {

    struct domainName {
        string uniqueId;
        string domainType;
    }

    mapping (address => domainName) allDomains;
    address[] allAddresses;
    //2 outer most mappings are 1-1 (addresses to uniqueId.type.eth),
    //mapping(address => mapping(string => mapping(string => string))) domainNames; //0x292839291039 => (uniqueId =>type)


    //register address as a domain
    function registerName(address _newAddress, string _uniqueId, string _type) public {
        var newDomain = allDomains[_newAddress];
        newDomain.uniqueId = _uniqueId;
        newDomain.domainType = _type;

        allAddresses.push(_newAddress) - 1;

    }

    //search for all domians and addresses of a certain type
    function searchByType(string _type) returns (string, string, string,  address){
        domainName[] ofType;
        address[] addrOfType;
        for(uint i = 0; i < allAddresses.length; i++) {
            if (compareStrings(allDomains[allAddresses[i]].domainType, _type)){
                ofType.push(allDomains[allAddresses[i]]);
                addrOfType.push(allAddresses[i]);
            }
        }
    }

    function getDomain (address _addr) public returns (string, string, string){
        return(allDomains[_addr].uniqueId, allDomains[_addr].domainType, ".eth");
    }

    function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }

}
