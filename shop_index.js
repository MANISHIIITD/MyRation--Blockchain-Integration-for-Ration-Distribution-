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
var contractAddress = "0xd395a33b18b529E32F3353334A48D9851dB35FC6";

var abi = JSON.parse(
  '[ { "constant": false, "inputs": [ { "internalType": "string", "name": "_Name", "type": "string" }, { "internalType": "uint256", "name": "_Age", "type": "uint256" }, { "internalType": "uint256", "name": "_income", "type": "uint256" } ], "name": "addNewUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "uid", "type": "uint256" }, { "internalType": "uint256", "name": "age", "type": "uint256" }, { "internalType": "uint256", "name": "bal", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "lt", "type": "uint256" } ], "name": "changeUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "msg", "type": "uint256" } ], "name": "printMessage", "type": "event" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "AllUsers", "outputs": [ { "internalType": "uint256", "name": "Age", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "string", "name": "Name", "type": "string" }, { "internalType": "uint256", "name": "lastTime", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "_uid", "type": "uint256" } ], "name": "getUserInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "uid", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]'
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
function AddNewUser() {
  _name = $("#name").val();
  _age = $("#age").val();
  _income = $("#income").val();
  val = "Wait for your UID";
  contract.methods
    .addNewUser(_name, _age, _income)
    .send({ from: account })
    .then(function (tx) {
      console.log("Transaction: ", tx);
      val = tx.events.printMessage.returnValues.msg;
      console.log(val);
      document.getElementById("uid").innerHTML = val;
    });
  $("#name").val("");
  $("#age").val("");
  $("#income").val("");
  document.getElementById("uid").innerHTML = val;
}

function GetUserInfo() {
  _uid = $("#uid2").val();
  contract.methods
    .getUserInfo(_uid)
    .call()
    .then(function (obj) {
      console.log("info: ", obj);
      document.getElementById("age2").innerHTML = obj[0];
      document.getElementById("bal2").innerHTML = obj[1];
      document.getElementById("name2").innerHTML = obj[2];
    });
}
