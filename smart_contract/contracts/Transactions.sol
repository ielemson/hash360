//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {
//   uintt256 is a type that is used to hold a variable. this is like an int declaration in other langugaes
uint256 transactionCount;

//this is a function that will be emitted at a later time
/*
address, unit, string,  uint256 are all types used to declare the type of variable 
 */
event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

// This is similiar to an object, we are specifying what properties the object will have and the types of the property
struct TransferStruct {
    address sender;
    address receiver;
    uint    amount;
    string  message;
    uint256 timestamp;
    string  keyword;
}

// The array variable transactions will be an array of TransferStruct
TransferStruct[] transactions;

function addToBlockChain(address payable receiver,uint amount,string memory message,string memory keyword) public{
transactionCount += 1;
//pushing the transactions into the transactions array
transactions.push(TransferStruct(msg.sender, receiver, amount,message, block.timestamp, keyword));

emit Transfer(msg.sender, receiver, amount,message, block.timestamp, keyword);

}
function getAllTransactions() public view returns (TransferStruct[] memory){
return transactions;
}

function getTransactionCount() public view returns (uint256){
return transactionCount;
}

}
