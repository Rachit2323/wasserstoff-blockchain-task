// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Transfer.sol"; 
import "./Vote.sol";
import "hardhat/console.sol";

contract Proxy {
    mapping(bytes4 => address) private implementations;

    Transfer private transferContract;

    Vote private voteContract;

    // Function selectors (functionId) for each delegated function
    bytes4 private constant TRANSFER_SELECTOR = bytes4(keccak256("_transfer(address)"));
    bytes4 private constant GET_VOTE = bytes4(keccak256("getListCandidates()"));
    bytes4 private constant ADD_CANDIDATES_SELECTOR = bytes4(keccak256("addCandidate(string,uint256,string)"));
    bytes4 private constant VOTE_SELECTOR = bytes4(keccak256("vote(uint256,address)"));
    bytes4 private constant GET_LIST_CANDIDATES_SELECTOR = bytes4(keccak256("getListCandidates()"));
    bytes4 private constant GET_WINNER_SELECTOR = bytes4(keccak256("getWinner()"));

    event FallbackCalled(bytes4 sig);

    function starting(address _transferAddress, address _voteAddress) external {
        transferContract = Transfer(_transferAddress);

        voteContract = Vote(_voteAddress);
        
        // Set the implementation addresses for each function
        implementations[TRANSFER_SELECTOR] = _transferAddress;


        implementations[ADD_CANDIDATES_SELECTOR] = _voteAddress;
        implementations[VOTE_SELECTOR] = _voteAddress;
        implementations[GET_LIST_CANDIDATES_SELECTOR] = _voteAddress;
        implementations[GET_WINNER_SELECTOR] = _voteAddress;
        implementations[GET_VOTE]=_voteAddress;
    }

    // Function to call the _transfer function of the Transfer contract
    function callTransfer(address payable _to) external payable {
        // Delegate the call to the implementation contract
          _delegate(TRANSFER_SELECTOR, abi.encode(_to));
    }

 
    // Function to add candidates
    function addCandidates(string memory name, uint256 candidateId, string memory party) external payable {
        // Delegate the call to the implementation contract
        _delegate(ADD_CANDIDATES_SELECTOR, abi.encode(name, candidateId, party));
    }

    // Function to vote for a candidate
    function vote(uint256 candidateId, address voter) external payable {
        // Delegate the call to the implementation contract
        _delegate(VOTE_SELECTOR, abi.encode(candidateId, voter));
    }

    // Function to get list of candidates
  function getListCandidates() external view returns (string[] memory candidateNames,uint256[] memory ids,string[] memory party, uint256[] memory voteCounts) {
        // Delegate the call to the implementation contract
        return voteContract.getListCandidates();
    }
    // Function to get the winner
    function getWinner() external view returns (string memory winnerName, uint256 winnerVoteCount) {
        // Delegate the call to the implementation contract
        return voteContract.getWinner();
    }


function  getVote(address voter) external view returns(bool hasVote) {
     return voteContract.getVote(voter);
    
}
    // Internal function to delegate the call to the implementation contract
  function _delegate(bytes4 _selector, bytes memory _params) internal {
    address _impl = implementations[_selector];
    require(_impl != address(0), "Implementation not found");
    
    // Forward the call to the implementation contract using call
    (bool success, ) = _impl.call(abi.encodePacked(_selector, _params));
    require(success, "Call failed");
}



}
