//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Election{
    struct Candidate {
        uint id;
        string name;
        uint votecount;
    }

    event electionUpdate (
        uint id,
        string name,
        uint votecount
    );

    address public admin;
    uint public candidateCount;
    bool public resultStatus;

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public votingStatus;

    constructor(){
        admin = msg.sender;

        addCandidate("Donald Trumph");
        addCandidate("Joe Biden");
    }

    function addCandidate(string memory name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
    }

    function vote(uint _id) public{
        require(!votingStatus[msg.sender], "You have voted");
        require(_id > 0 && _id <= candidateCount, "Id doesnt exist");
        votingStatus[msg.sender] = true;
        candidates[_id].votecount++;
        emit electionUpdate(_id, candidates[_id].name, candidates[_id].votecount);
    } 

    function getvotingStatus() public view returns(bool){
        return votingStatus[msg.sender];
    }

    function declareResult() public {
        require (msg.sender == admin);
        resultStatus = true;
    }
}