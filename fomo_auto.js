const Web3 = require('web3');
const moment = require('moment');
var fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");

// local config
// var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
// var FoMo3DlongContractAddress = '0x9eFa9B6aB3B7f02603Cb7093bb5B3EB571e662BE';

// My Windows config
var web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e");
var FoMo3DlongContractAddress = '0x81ba62cb8ba77db414e0b12c173eaadc65df6cfb';

var ropsten_private_key = "bbeaebebee24f2090e5f9ad149ac04b4152f3813ddc676884ba5db4ba82c6c81";
var ropsten_infura_url = "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e";


var gasPrice = "10020";
var gas = "6699900"; // gas limit

var usrMap= {};
usrMap[0] = 'whale';
usrMap[1] = 'bear';
usrMap[2] = 'snake';
usrMap[3] = 'bull';

var checkList = [];

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
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (買Key時間是否有增加)
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

    // 突破限制前100個ETH，限制空投
    // console.log('\n鯨隊用99.9 ETH 買key');

    // var howMuchETH = web3.utils.toWei('99.9','ether')
    // console.log("howMuchETH: ", howMuchETH)
    // await buyKeyDependOnEth(howMuchETH, 0);


    // register_id = await FoMo3Dlong.methods.pIDxAddr_(account).call()
    // console.log("註冊玩家pID: " + register_id);
    // plyr = await FoMo3Dlong.methods.plyr_(0).call()
    // console.log(plyr);
    // keyNum = '1500'
    // for (var i=0; i<99;i++){
        // console.log(`\n鯨隊買${keyNum}個Key`);
        // await buyKey(keyNum, 1);
    // }

    keyNum = '10'
    console.log(`\n鯨隊買${keyNum}個Key`);
    await buyKey(keyNum, 0);
    console.log(`\n熊隊買${keyNum}個Key`);
    await buyKey(keyNum, 1);
    console.log(`\n蛇隊買${keyNum}個Key`);
    await buyKey(keyNum, 2);
    console.log(`\n牛隊買${keyNum}個Key`);
    await buyKey(keyNum, 3);


    keyPrice = await FoMo3Dlong.methods.getBuyPrice().call()
    console.log("\n現在Key的價錢(wei): ", keyPrice);
    if (keyPrice > 75000000000000) {
        msg = "✔ 鑰匙價格有增加"
        console.log(msg);
        checkList.push(msg);
    }

    // 所有玩家餘額
    await allBalance();

    // 此輪資訊
    await roundInfo();


    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (whale 推薦 玩家5 )
    //====|=========================================================================
    await register(whale, "fatwhale", referee, true);
    // process.exit()



    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (提款跑路)
    //====|=========================================================================
    await withdraw(whale);

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (玩家此輪資訊)
    //====|=========================================================================
    // 以Whale為例
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "玩家此輪資訊");
    console.log("=".repeat(100));
    whale_id = await FoMo3Dlong.methods.pIDxAddr_(whale).call()
    whale_round_info = await FoMo3Dlong.methods.plyrRnds_(whale_id, 1).call()
    console.log("whale_round_info: ", whale_round_info);


    var eth = web3.utils.fromWei(whale_round_info.eth,'ether')
    console.log("whale此輪投入的ETH: ", eth);

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (各隊伍資訊)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "各隊伍資訊");
    console.log("=".repeat(100));
    whale_team_eth = await FoMo3Dlong.methods.rndTmEth_(1, 0).call() // whale
    bear_team_eth = await FoMo3Dlong.methods.rndTmEth_(1, 1).call() // bear
    snake_team_eth = await FoMo3Dlong.methods.rndTmEth_(1, 2).call() // snake
    bull_team_eth = await FoMo3Dlong.methods.rndTmEth_(1, 3).call() // bull
    console.log("whale_team_eth: ", whale_team_eth);
    console.log("bear_team_eth: ", bear_team_eth);
    console.log("snake_team_eth: ", snake_team_eth);
    console.log("bull_team_eth: ", bull_team_eth);

    currentRoundInfo = await FoMo3Dlong.methods.getCurrentRoundInfo().call()

    console.log("此輪詳細資訊(getCurrentRoundInfo function得到): ", currentRoundInfo);

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (空投資訊)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "空投資訊");
    console.log("=".repeat(100));

    airDropPot_wei = await FoMo3Dlong.methods.airDropPot_().call()
    airDropPot = web3.utils.fromWei(airDropPot_wei, 'ether')
    console.log("airDropPot: ", airDropPot);

    airDropTracker = await FoMo3Dlong.methods.airDropTracker_().call()
    console.log("airDropTracker: ", airDropTracker);


    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (檢查報告)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "檢查報告 ");
    console.log("=".repeat(100));
    for(i=0; i < checkList.length; i++) {
        console.log(checkList[i]);
    }

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (新的此輪資訊)
    //====|=========================================================================
    whale_id = await FoMo3Dlong.methods.pIDxAddr_(whale).call()
    whaleVaults = await FoMo3Dlong.methods.getPlayerVaults(whale_id).call()
    console.log("whaleVaults");
    console.log(whaleVaults);

    snake_id = await FoMo3Dlong.methods.pIDxAddr_(snake).call()
    snakeVaults = await FoMo3Dlong.methods.getPlayerVaults(snake_id).call()
    console.log("snakeVaults");
    console.log(snakeVaults);



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

    var txnObject = {
        from: account,
        value: buyNamePrice,
        gasPrice: gasPrice,
        gas: gas
    };
    try{
        await FoMo3Dlong.methods.registerNameXID(name, 4, _all).send(txnObject);

    }catch(err) {
        console.log(err);
    }

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



function Unix_timestamp(t)
{
    var dt = new Date(t*1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
}

async function allBalance(){
    console.log("\n********** 所有玩家餘額 **********");
    player_accounts = ['banker', 'whale', 'bear', 'snake', 'bull', 'referee', 'allbuyer']
    for(i=0; i <= 6; i++) {
        wei = await web3.eth.getBalance(accounts[i]);
        balance = web3.utils.fromWei(wei, 'ether')
        player = player_accounts[i];
        console.log(`${player}餘額: `.padEnd(20) + `${balance}`);
    }
}

async function defaultAccount(){
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "預設帳號");
    console.log("=".repeat(100));

    accounts = [];
    // accounts = await web3.eth.getAccounts();
    // banker = accounts[0];
    // whale = accounts[1];
    // bear = accounts[2];
    // snake = accounts[3];
    // bull = accounts[4];
    // referee = accounts[5];
    // allbuyer = accounts[6];
    // console.log("!!!!!!!!!! accounts: ", accounts);
    //
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");
    accounts.push("0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920");

    banker = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    whale = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    bear = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    snake = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    bull = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    referee = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
    allbuyer = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";


    console.log("banker地址: ".padEnd(20) + banker);
    console.log("whale地址: ".padEnd(20) + whale);
    console.log("bear地址: ".padEnd(20) + bear);
    console.log("snake地址: ".padEnd(20) +  snake);
    console.log("bull地址: ".padEnd(20) + bull);
    console.log("referee地址: ".padEnd(20) + referee);
    console.log("allbuyer地址: ".padEnd(20) + allbuyer);
    console.log();

    await allBalance();

    // FoMo3DlongContractAddress = '0x9efa9b6ab3b7f02603cb7093bb5b3eb571e662be';
    var FoMo3DlongContract = JSON.parse(fs.readFileSync('./build/contracts/FoMo3Dlong.json', 'utf8'));
    FoMo3Dlong = new web3.eth.Contract(FoMo3DlongContract.abi, FoMo3DlongContractAddress);


    console.log();
    roundID = await FoMo3Dlong.methods.rID_().call();
    console.log(`第[${roundID}]輪遊戲`);

    return FoMo3Dlong;
}

async function roundInfo() {

    console.log("\n********** 此輪資訊 **********");
    roundID = await FoMo3Dlong.methods.rID_().call();
    console.log(`第[${roundID}]輪遊戲`);

    timeLeft = await FoMo3Dlong.methods.getTimeLeft().call()
    const formatted = moment.utc(timeLeft*1000).format('HH:mm:ss');
    console.log("剩餘時間: ", formatted)

    round = await FoMo3Dlong.methods.round_(roundID).call();
    console.log("領先的玩家ID (pID): ".padEnd(20) + round.plyr);
    console.log("領先的隊伍(tID):    ".padEnd(20), round.team, usrMap[round.team]);
    var keyNum = web3.utils.fromWei(round.keys, 'ether')
    console.log("key的數量:          ".padEnd(20) +  keyNum);
    var eth = web3.utils.fromWei(round.eth,'ether')
    console.log("總共的ETH(總投資金額):          ".padEnd(20) + eth + " (ETH)");
    var pot = web3.utils.fromWei(round.pot,'ether')
    console.log("獎池金額:           ".padEnd(20) + pot  + " (ETH)");
    console.log("round end function是否有跑: ".padEnd(20) + round.ended);
    console.log("遊戲開始時間:       ".padEnd(20) + Unix_timestamp(round.strt));
    console.log("遊戲結束時間:       ".padEnd(20) + Unix_timestamp(round.end));
    console.log("Global Mask:       ".padEnd(20) + round.mask);
    console.log("ico: ".padEnd(20) + round.ico);
    console.log("icoGen: ".padEnd(20) + round.icoGen);
    console.log("icoAvg: ".padEnd(20) + round.icoAvg);
    console.log();

    console.log("Distributed Rewards(已分派利潤): ", eth - pot);
    console.log("Time Purchased(已購買時間) Seconds: ", keyNum * 30 );  // key purchased * rndInc_(private)
    console.log("Time Purchased(已購買時間) Years: ", (keyNum * 30) / 31536000 );  // key purchased * rndInc_(private)
    console.log();

    console.log("領先玩家資訊- pID: " + round.plyr);
    plyr = await FoMo3Dlong.methods.plyr_(round.plyr).call()
    console.log(plyr);

}


async function buyKeyDependOnEth(eth, team) {
    var account = accounts[team+1];



    var txnObject = {
        from: account,
        value: eth,
        gasPrice: gasPrice,
        gas: gas,
        provider: function() {
            return new HDWalletProvider(ropsten_private_key, ropsten_infura_url)
        },
        network_id: 3
    };
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
    FoMo3Dlong.methods.buyXname(_affCode,team).send(txnObject, (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Transaction hash ID: ", result);
        }
    });

}


async function buyKey(numOfKey, team) {

    var numOfWei = web3.utils.toWei(numOfKey,'ether')
    XKeyPrice = await FoMo3Dlong.methods.iWantXKeys(numOfWei).call()
    console.log("XKeyPrice: ", XKeyPrice);

    var account = accounts[team+1];

    var txnObject = {
        from: account,
        value: XKeyPrice,
        gasPrice: gasPrice,
        gas: gas,
        provider: function() {
            return new HDWalletProvider(ropsten_private_key, ropsten_infura_url)
        },
        network_id: 3
    };
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
    FoMo3Dlong.methods.buyXname(_affCode,team).send(txnObject, (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Transaction hash ID: ", result);
        }
    });

}


async function withdraw(account) {
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "提款跑路");
    console.log("=".repeat(100));

    wei = await web3.eth.getBalance(account);
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(`帳號 ${account}  原本餘額: ` + balance);

    withdraw_id = await FoMo3Dlong.methods.pIDxAddr_(account).call()
    console.log("提款玩家資訊- pID: " + withdraw_id);
    plyr = await FoMo3Dlong.methods.plyr_(withdraw_id).call()
    console.log(plyr);


    withdrawVaults = await FoMo3Dlong.methods.getPlayerVaults(withdraw_id).call()
    console.log("提款玩家資訊: ", withdrawVaults)
    console.log("提款玩家錢包");
    console.log("win: ", withdrawVaults[0]);
    balance = web3.utils.fromWei(withdrawVaults[1], 'ether')
    console.log("gen(玩家當前分潤): ", balance);
    console.log("aff: ", withdrawVaults[2]);


    var txnObject = {
        from: account,
        gasPrice: gasPrice,
        gas: gas
    };
    try{
        result = await FoMo3Dlong.methods.withdraw().send(txnObject);
        wei = await web3.eth.getBalance(account);
        balance = web3.utils.fromWei(wei, 'ether')
        console.log(`帳號 ${account}  提款後增加為 餘額: ` + balance);
        console.log("成功提款");
        msg = "✔ 玩家可提款"
        checkList.push(msg);
    } catch(err) {
        console.log(err);
    }
    // FoMo3Dlong.methods.withdraw().send(txnObject, (err, result) => {
        // if(err){
            // console.log(err);
        // } else {
            // console.log("成功提款");
            // msg = "✔ 玩家可提款"
            // checkList.push(msg);
        // }
    // });

}




async function maybeUse() {

    banker_id = await FoMo3Dlong.methods.pIDxAddr_(banker).call()
    console.log("banker_id: ", banker_id);

    timeLeft = await FoMo3Dlong.methods.getTimeLeft().call()
    console.log("time left: ", timeLeft/60);

    XKeyPrice = await FoMo3Dlong.methods.iWantXKeys(100000).call()
    console.log("XKeyPrice: ", XKeyPrice);

    round = await FoMo3Dlong.methods.round_(1).call()
    console.log(round.strt);
    console.log(round.end);
    console.log("Start time: ", Unix_timestamp(round.strt));
    console.log("End time: ", Unix_timestamp(round.end));


    plyr = await FoMo3Dlong.methods.plyr_(0).call()
    console.log(plyr);
    plyr = await FoMo3Dlong.methods.plyr_(1).call()
    console.log(plyr);

    currentRound = await FoMo3Dlong.methods.getCurrentRoundInfo().call()
    console.log("新的此輪資訊");
    console.log(currentRound);


    snakeInfo = await FoMo3Dlong.methods.getPlayerInfoByAddress(snake).call()
    console.log("snakeInfo");
    console.log(snakeInfo);


    // 訂閱Events
    // var ws = new Web3('ws://127.0.0.1:8545');
    // let F3DeventsContract = JSON.parse(fs.readFileSync('./build/contracts/F3Devents.json', 'utf8'));
    // let F3Devents = new ws.eth.Contract(F3DeventsContract.abi, FoMo3DlongContractAddress);

    // F3Devents.events.onNewName({
    // fromBlock: 0
        // // toBlock: 'latest'
    // }, function(error, event){ console.log(event); })
    // .on('data', event => {
        // console.log(event); // same results as the optional callback above
    // })
    // .on('error', error => {
        // console.log(error);
    // })
    // .on('end', event => {
        // console.log(event);
    // });

}
