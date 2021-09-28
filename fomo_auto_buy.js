const Web3 = require('web3');
const moment = require('moment');
var fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require('ethereumjs-tx')


// My Windows config
var web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e");
var FoMo3DlongContractAddress = '0x81ba62cb8ba77db414e0b12c173eaadc65df6cfb';

var ropsten_private_key = "bbeaebebee24f2090e5f9ad149ac04b4152f3813ddc676884ba5db4ba82c6c81";
// var ropsten_private_key = "04DD6E2895410215B986C89E07C5B46277608CFE8C7DEC2093FBCEBEBEC63BD0";
var ropsten_infura_url = "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e";

// var Ropsten_Jimmy1818_PrivateKey = "04DD6E2895410215B986C89E07C5B46277608CFE8C7DEC2093FBCEBEBEC63BD0";
// var Ropsten_Jimmy1818 = "0xFc7bc7d413F61C590DaF476eA364b9ea6A9b05E2";
var Ropsten_Jimmy1 = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";

var gas = "6500000";
var gasPrice = "100000000000";

var checkList = [];
var usrMap= {};
usrMap[0] = 'whale';
usrMap[1] = 'bear';
usrMap[2] = 'snake';
usrMap[3] = 'bull';


main()

async function main() {
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (Settting Accounts)
    //====|=========================================================================
    FoMo3Dlong = await defaultAccount();

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (公司帳號)
    //====|=========================================================================

    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "公司帳號");
    console.log("=".repeat(100));

    Jekyll_Island_Inc = await FoMo3Dlong.methods.Jekyll_Island_Inc().call()
    console.log("Jekyll_Island_Inc: ".padEnd(20) + Jekyll_Island_Inc);

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (買Key)
    //====|=========================================================================

    // ** 重要！  需要等 rndGap_ (30sec) 結束才能開始買key
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "買Key");
    console.log("=".repeat(100));


    keyPrice = await FoMo3Dlong.methods.getBuyPrice().call()
    console.log("上個Key的價錢(wei): ", keyPrice);


    activated = await FoMo3Dlong.methods.activated_().call();
    console.log("遊戲啟動與否(預設已啟動): ", activated);
    // 鯨隊買第一個Key，啟動遊戲
    // buyXid(key數量, 隊伍)
    // 0: Whale
    // 1: Bear
    // 2: Snake
    // 3: Bull

    keyNum = '10'
    console.log(`\n鯨隊買${keyNum}個Key`);
    await buyKey(keyNum, 1);

    keyPrice = await FoMo3Dlong.methods.getBuyPrice().call()
    console.log("\n現在Key的價錢(wei): ", keyPrice);
    if (keyPrice > 75000000000000) {
        msg = "✔ 鑰匙價格有增加"
        console.log(msg);
        checkList.push(msg);
    }

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (買名字 )
    //====|=========================================================================
    // await register(bear, "jimmy1818", referee, true);
    // process.exit()
}

async function defaultAccount(){
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "預設帳號");
    console.log("=".repeat(100));

    accounts = [];

    var acc = Ropsten_Jimmy1;
    accounts.push(acc);
    accounts.push(acc);
    accounts.push(acc);
    accounts.push(acc);
    accounts.push(acc);
    accounts.push(acc);
    accounts.push(acc);

    banker = Ropsten_Jimmy1;
    whale = Ropsten_Jimmy1;
    bear = Ropsten_Jimmy1;
    snake = Ropsten_Jimmy1;
    bull = Ropsten_Jimmy1;
    referee = Ropsten_Jimmy1;
    allbuyer = Ropsten_Jimmy1;


    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    // accounts.push("0xFc7bc7d413F61C590DaF476eA364b9ea6A9b05E2");
    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    // accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");

    // banker = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    // whale = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    // bear = "0xFc7bc7d413F61C590DaF476eA364b9ea6A9b05E2"; //Jimmy1818
    // snake = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    // bull = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    // referee = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    // allbuyer = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";


    console.log("banker地址: ".padEnd(20) + banker);
    console.log("whale地址: ".padEnd(20) + whale);
    console.log("bear地址: ".padEnd(20) + bear);
    console.log("snake地址: ".padEnd(20) +  snake);
    console.log("bull地址: ".padEnd(20) + bull);
    console.log("referee地址: ".padEnd(20) + referee);
    console.log("allbuyer地址: ".padEnd(20) + allbuyer);
    console.log();

    var FoMo3DlongContract = JSON.parse(fs.readFileSync('./build/contracts/FoMo3Dlong.json', 'utf8'));
    FoMo3Dlong = new web3.eth.Contract(FoMo3DlongContract.abi, FoMo3DlongContractAddress);


    console.log();
    roundID = await FoMo3Dlong.methods.rID_().call();
    console.log(`第[${roundID}]輪遊戲`);

    return FoMo3Dlong;
}

async function buyKey(numOfKey, team) {
    var numOfWei = web3.utils.toWei(numOfKey,'ether')
    XKeyPrice = await FoMo3Dlong.methods.iWantXKeys(numOfWei).call()
    console.log("XKeyPrice: ", XKeyPrice);

    var account = accounts[team+1];
    console.log("account===========: ", account);

    var wei = await web3.eth.getBalance(account);
    var balance = web3.utils.fromWei(wei, 'ether')
    console.log(`帳號 ${account}  原本餘額: ` + balance);

    var _affCode = "jj";

    if (_affCode && _affCode.length > 0) {
        try{
            _affCode = web3.utils.fromAscii(_affCode);
        } catch (err){
            _affCode = '0x00';
        }
    } else {
        _affCode = '0x00';
    }

    var funX = FoMo3Dlong.methods.buyXname(_affCode, team);
    var acc = web3.eth.accounts.privateKeyToAccount(ropsten_private_key);
    var encoded = funX.encodeABI();
    var nonce = await web3.eth.getTransactionCount(account, 'pending');
    // var nonce = await web3.eth.getTransactionCount(account);
    console.log("nonce: ", nonce);
    console.log("nonce hex: ", web3.utils.toHex(nonce));

    var payload = {
        nonce: web3.utils.toHex(nonce),
        data: encoded,
        from: account,
        to: FoMo3DlongContractAddress,
        chainId: 3,
        gas: web3.utils.toHex(gas),
        value: web3.utils.toHex(XKeyPrice)
    }
    try{
        acc.privateKey = '0x' + acc.privateKey;
        console.log("acc.privateKey: ", acc.privateKey);
        web3.eth.accounts.signTransaction(payload, acc.privateKey).then(signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
        });
    }catch(err){
        console.log(err);
    }

}

async function register(account, name, referee, _all){
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "註冊名字");
    console.log("=".repeat(100));

    var buyNamePrice = web3.utils.toWei('0.01','ether')

    console.log("欲註冊的玩家地址: ".padEnd(20) + account);
    console.log("推薦玩家地址: ".padEnd(20) + referee);
    console.log("欲註冊的名字: ".padEnd(20) + name);
    console.log("buyNamePrice: ".padEnd(20) + buyNamePrice);


    //===============================
    var _affCode = "jj";
    if (_affCode && _affCode.length > 0) {
        try{
            _affCode = web3.utils.fromAscii(_affCode);
        } catch (err){
            _affCode = '0x00';
        }
    } else {
        _affCode = '0x00';
    }
    var funX = FoMo3Dlong.methods.registerNameXname(name, _affCode, _all);
    var acc = web3.eth.accounts.privateKeyToAccount(ropsten_private_key);
    var encoded = funX.encodeABI();
    var nonce = await web3.eth.getTransactionCount(account, 'pending');

    var payload = {
        nonce,
        data: encoded,
        from: account,
        to: FoMo3DlongContractAddress,
        chainId: 3,
        gas: web3.utils.toHex(gas),
        value: web3.utils.toHex(buyNamePrice)
    }
    try{
        acc.privateKey = '0x' + acc.privateKey;
        console.log("acc.privateKey: ", acc.privateKey);
        web3.eth.accounts.signTransaction(payload, acc.privateKey).then(signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
        });
    }catch(err){
        console.log(err);
    }
    //===============================

    register_id = await FoMo3Dlong.methods.pIDxAddr_(account).call()
    console.log("註冊玩家pID: " + register_id);
    plyr = await FoMo3Dlong.methods.plyr_(register_id).call()  // plyr is bytes32
    console.log(plyr);
    console.log("name: ", web3.utils.toAscii(plyr.name) );
    console.log("name2: ", plyr.name);
    if (plyr.name == '0x0000000000000000000000000000000000000000000000000000000000000000') {
        msg = "✘ 註冊名字"
        checkList.push(msg);
    }

    // bytes32 type(web3 string)
    pID = await FoMo3Dlong.methods.pIDxName_(web3.utils.fromAscii(name)).call()
    if (pID == register_id) {
        console.log("註冊名字成功!");
        msg = "✔ 註冊名字"
        checkList.push(msg);
    }

}

