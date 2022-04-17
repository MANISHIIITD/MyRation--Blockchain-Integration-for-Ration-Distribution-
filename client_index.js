// Source code to interact with smart contract

// web3 provider with fallback for old version
// window.addEventListener("load", async () => {
//   // New web3 provider
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//       // ask user for permission
//       await ethereum.enable();
//       // user approved permission
//     } catch (error) {
//       // user rejected permission
//       console.log("user rejected permission");
//     }
//   }
//   // Old web3 provider
//   else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider);
//     // no need to ask for permission
//   }
//   // No web3 provider
//   else {
//     console.log("No web3 provider detected");
//   }
// });
// console.log(window.web3.currentProvider);

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

async function load() {
  await loadWeb3();
}

load();

// contractAddress and abi are setted after contract deploy
var contractAddress = "0x9e5eAA8D9A918b157AFc83ec1b6fE0E71db0B3a3";

var abi = JSON.parse(
  '[ { "constant": false, "inputs": [ { "internalType": "uint256", "name": "_uid", "type": "uint256" }, { "internalType": "uint256", "name": "_age", "type": "uint256" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_wheatquantity", "type": "uint256" }, { "internalType": "uint256", "name": "_ricequantity", "type": "uint256" }, { "internalType": "uint256", "name": "_pulsequantity", "type": "uint256" } ], "name": "addTransaction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "msg", "type": "string" } ], "name": "printMessage", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "msg", "type": "uint256" } ], "name": "printMessage2", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "setAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getLatestUID", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "u", "type": "uint256" } ], "name": "viewUserDetails", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]'
);

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert(
      "No account found! Make sure the Ethereum client is configured properly."
    );
    return;
  }
  account = accounts[0];
  console.log("Total Accounts = " + accounts.length);
  console.log("Account: " + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function Transact() {
  _uid = $("#uid").val();
  _age = $("#age").val();
  _name = $("#name").val();
  _wheat = $("#wheat").val();
  _rice = $("#rice").val();
  _pulse = $("#pulse").val();
  contract.methods
    .addTransaction(_uid, _age, _name, _wheat, _rice, _pulse)
    .send({ from: account })
    .then(function (tx) {
      console.log("Transaction: ", tx);
    });
  $("#name").val("");
  $("#age").val("");
  $("#uid").val("");
  $("#wheat").val("");
  $("#rice").val("");
  $("#pulse").val("");
}

function GetBalance() {
  _uid = $("#uid2").val();
  contract.methods
    .viewUserDetails(_uid)
    .call()
    .then(function (obj) {
      console.log("Object from Get: ", obj);
      document.getElementById("bal2").innerHTML = obj[1];
    });
}
