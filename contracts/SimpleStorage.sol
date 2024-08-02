// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 favoriteNum;

    struct Person {
        string name;
        uint256 age;
    }

    Person[] public person;

    mapping(string => uint256) public personMap;

    function store(uint256 _favoriteNum) public virtual {
        favoriteNum = _favoriteNum;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNum;
    }

    function addPerson(string memory _name, uint256 _age) public {
        person.push(Person(_name, _age));
        personMap[_name] = _age;
    }

    function getPerson(uint256 index) public view returns (Person memory) {
        return person[index];
    }
}
