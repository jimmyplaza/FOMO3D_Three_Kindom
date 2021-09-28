const Web3 = require('web3');

let provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(provider);
// const web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log(coinbase);
console.log(balance);

var accounts = web3.eth.accounts;
accounts.forEach( element => {
  console.log(element);
});

var a1_balance = web3.eth.getBalance(accounts[0]);
console.log("a1 balance: ", a1_balance.toNumber() / 1e18);

for(var i=1; i < 10; i++) {
    web3.eth.sendTransaction({
        from: accounts[i],
        to: accounts[0],
        value: web3.toWei(99, "ether")
    })
}


var a1_balance = web3.eth.getBalance(accounts[0]);
console.log("a1 balance: ", a1_balance.toNumber() / 1e18);
