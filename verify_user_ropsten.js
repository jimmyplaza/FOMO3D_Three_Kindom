const Web3 = require('web3');
const moment = require('moment');
var fs = require('fs');

// local config
var web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e");
var FoMo3DlongContractAddress = '0xf8bbee7a6ed35d94fab909d5b7ec22a149dc68e8';


// local
// var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
// var FoMo3DlongContractAddress = '0x9eFa9B6aB3B7f02603Cb7093bb5B3EB571e662BE';


// My Windows config
// var web3 = new Web3(Web3.givenProvider || "http://10.10.30.49:8545");
// var FoMo3DlongContractAddress = '0xa1609a36e813837c55e76c6d5f354896c2aaa2ff';

var gasPrice = "10020";
var gas = "6699900"; // gas limit

var usrMap= {};
usrMap[0] = 'whale';
usrMap[1] = 'bear';
usrMap[2] = 'snake';
usrMap[3] = 'bull';

var checkList = [];
// var player_address = '0x7b2a30ce5Ed8bC9C0855d3d380Af8FC493aEA032';
var player_address = "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920";
var rID;

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
    playerBook_addr = await FoMo3Dlong.methods.playerBook().call()

    console.log("Jekyll_Island_Inc: ".padEnd(20) + Jekyll_Island_Inc);
    console.log("playerBook_addr: ".padEnd(20) + playerBook_addr);


    // 鯨隊買第一個Key，啟動遊戲
    // buyXid(key數量, 隊伍)
    // 0: Whale
    // 1: Bear
    // 2: Snake
    // 3: Bull

    // 所有玩家餘額
    // await allBalance();

    // 此輪資訊
    await roundInfo();

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (玩家此輪資訊)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "玩家此輪資訊");
    console.log("=".repeat(100));
    player_id = await FoMo3Dlong.methods.pIDxAddr_(player_address).call()
    player_round_info = await FoMo3Dlong.methods.plyrRnds_(player_id, rID).call()
    console.log("player_round_info: ", player_round_info);

    mannix_Vaults = await FoMo3Dlong.methods.getPlayerVaults(player_id).call()
    console.log("mannix_Vaults");
    console.log(mannix_Vaults);


    var eth = web3.utils.fromWei(player_round_info.eth,'ether')
    console.log("Player此輪投入的ETH: ", eth);


    var keys = web3.utils.fromWei(player_round_info.keys,'ether')
    console.log("Player此輪投入的Key: ", keys);

    plyr = await FoMo3Dlong.methods.plyr_(player_id).call()  // plyr is bytes32
    console.log(plyr);
    console.log("name: ", web3.utils.toAscii(plyr.name) );

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
    console.log("airDropPot_wei: ", airDropPot_wei);
    airDropPot = web3.utils.fromWei(airDropPot_wei, 'ether')
    console.log("airDropPot: ", airDropPot);

    airDropTracker_wei = await FoMo3Dlong.methods.airDropTracker_().call()
    console.log("airDropTracker_wei: ", airDropTracker_wei);

    airDropTracker = web3.utils.fromWei(airDropTracker_wei, 'ether')
    console.log("airDropTracker: ", airDropTracker);


    //  每Round結束時的收益
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (每Round結束時的收益)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "每Round結束時的收益");
    console.log("=".repeat(100));
    // airDropTracker_wei = await FoMo3Dlong.methods.().call()

    // roundID = 1;
    for(var i=1;i <= 10;i++){
        console.log("第%s輪: ", i);

        round = await FoMo3Dlong.methods.round_(i).call();
        // var keyNum = web3.utils.fromWei(round.keys, 'ether')
        // console.log("key的數量:          ".padEnd(20) +  keyNum);
        var eth = web3.utils.fromWei(round.eth,'ether')
        console.log("每一局總共的ETH(總投資金額):          ".padEnd(20) + eth + " (ETH)");
        var pot = web3.utils.fromWei(round.pot,'ether')
        console.log("獎池金額: ".padEnd(20) + pot  + " (ETH)");
        console.log("此局結束時的收益(3%): ".padEnd(20) + pot * 0.03  + " (ETH)");
    }

    //  每一Round購買推薦人時的收益
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (每一Round購買推薦人時的收益)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "每一Round購買推薦人時的收益");
    console.log("=".repeat(100));

    var nameCost = 0.01;
    var count = 0;
    for(var i = 0; i <= 20;i++){
        plyr = await FoMo3Dlong.methods.plyr_(i).call()  // plyr is bytes32
        var name = web3.utils.toAscii(plyr.name);
        console.log("name: ", name);
        if(plyr.name != "0x0000000000000000000000000000000000000000000000000000000000000000"){
            count++;
        }
    }
    console.log("count: ", count);
    var totalCost = count * nameCost;
    console.log("收益: ", totalCost);

    //  每一Round的累積收益
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (每一Round的累積收益 )
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "每一Round的累積收益");
    console.log("=".repeat(100));

	var totalETH = 0;
    for(var i=1;i <= 10;i++){
        console.log("第%s輪: ", i);

        round = await FoMo3Dlong.methods.round_(i).call();
        console.log("round: ", round.eth);
		totalETH += parseInt(round.eth);
    }
    console.log("totalETH: ", totalETH);
    var tt = web3.utils.fromWei(totalETH.toString(),'ether')
    console.log("每一局總共的ETH(總投資金額):          ".padEnd(20) + tt + " (ETH)");


    //  DAU modify
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (DAU modify)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "DAU modify");
    console.log("=".repeat(100));

    var interval = 86400;
    var startCount = 1;
    var endCount = 1000;

    var startTime = 1543507200; //11/30  00:00:00
    var endTime = startTime + interval*6; //  12/1
    console.log("startTime: ", startTime);
    console.log("endTime: ", endTime);

    1543420800
    1543565747
    var i = 0;
    var dau_len = await FoMo3Dlong.methods.getDauLength().call();
    console.log("dau_len: ", dau_len);

    // for(var i=0; i< dau_len;i++){
        // var dau = await FoMo3Dlong.methods.dau_(i).call();
        // console.log("dd: ", dau);
    // }

    // for(var i=0;i<dau.length;i++){
        // console.log("dat: ", dau[i]);
    // }

    var dauMultiArr = await FoMo3Dlong.methods.searchDAU(startTime, endTime, interval, startCount, endCount).call();
    console.log("dauMultiArr: ", dauMultiArr);

        // var dauMultiArr = await FoMo3Dlong.methods.searchDAU(startTime, endTime, startCount, endCount).call();
        // console.log(dauMultiArr);
        // console.log("dauMultiArr.length: ", dauMultiArr.timeArray.length);

        // var outArr = [];
        // for(var i =0; i<dauMultiArr.timeArray.length;i++){
            // if(dauMultiArr.timeArray[i] == 0){
                // continue;
            // }

            // var out = {};
            // out.timestamp = dauMultiArr.timeArray[i];
            // var eth = web3.utils.fromWei(dauMultiArr.ethArray[i], 'ether');
            // out.eth = eth;
            // out.pID = dauMultiArr.pidArray[i];
            // out.rID = dauMultiArr.ridArray[i];
            // outArr.push(out);
        // }
        // console.log("outArr: ", outArr);



    //  DAU
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (DAU)
    //====|=========================================================================
    // console.log("=".repeat(100));
    // console.log(" ".repeat(50) + "DAU");
    // console.log("=".repeat(100));

    // // 2 parameter: startTime, endTime
    // var startTime = 1543248000;
    // var endTime =   1543507200;
    // var interval = 86400;

    // var i = 0;
    // var dau_len = await FoMo3Dlong.methods.getDauLength().call();

    // var outArry = [];
    // // Initial outArry
    // for (var i = startTime; i <= endTime;  i += interval) {
      // var out = {};
      // out.timestamp = i;
      // out.eth = 0;
      // out.usercount = 0;
      // outArry.push(out);
    // }
    // console.log("outArry initial: ", outArry);

    // for(var i = 0; i< dau_len; i++) {
        // var dau = await FoMo3Dlong.methods.dau_(i).call();
        // for (var j = 0; j < outArry.length; j++) {
            // var s = outArry[j].timestamp;
            // var e;
            // if( j+1 < outArry.length){
                // e = outArry[j+1].timestamp;
            // }else{
                // break;
            // }
            // console.log("s: ", s);
            // console.log("e: ", e);
            // console.log(`dau.timestamp: `, dau.timestamp);
            // if (dau.timestamp >= s && dau.timestamp < e) {

                // console.log(`dau[${i}].eth: `, dau.eth);
                // outArry[j].eth += parseInt(dau.eth);
                // outArry[j].usercount++;
                // console.log(`outArry[${j}].eth: `, outArry[j].eth);
                // console.log(`outArry[${j}].usercount: `, outArry[j].usercount);
                // break;
            // }
        // }
    // }
    // console.log("outArry: ", outArry);

    // for (var i = 0; i < outArry.length;  i++){
        // if( outArry[i].usercount != 0){
            // outArry[i].eth = web3.utils.fromWei(outArry[i].eth.toString(), 'ether') / outArry[i].usercount;
            // // outArry[i].eth = outArry[i].eth / outArry[i].usercount;
        // }
    // }

    // console.log("outArry2 : ", outArry);




    // var totalCost = 0;
    // var outArr= [];
    // for(var i = 0; i < daulen; i++){
        // var dau = await FoMo3Dlong.methods.dau_(i).call();
        // if(dau.timestamp >= startTime && dau.timestamp <= endTime){
            // console.log("============");
            // console.log("rID: ", dau.rID);
            // console.log("pID: ", dau.pID);
            // console.log("timestamp: ", dau.timestamp);
            // console.log("eth: ", dau.eth);
            // // var interval = 86400-1;
            // var interval = 30-1;
            // var avgEth = 0;
            // var count = 0;
            // var out = {};
            // var dayArr = [];
            // var strt = startTime;
            // while(1){
                // out.eth = 0;
                // console.log("in while");
                // console.log("in while strt: ", strt);
                // if(dau.timestamp >= strt ){
                    // console.log("in if strt: ", strt);
                    // count++;
                    // dayArr.time = startTime;
                    // out.eth = out.eth + parseInt(dau.eth);
                    // out.time = startTime;
                    // strt += interval;
                    // if(     ){
                        // break;
                    // }else{
                        // console.log("else")
                        // break;
                    // }
                // }else{
                    // console.log("1. if else");
                    // console.log("dau.timestamp: ", dau.timestamp);
                    // console.log("strt: ", strt);
                    // break;
                // }
            // }
            // if(count == 0){
                // dayArr.eth = 0;
            // }else{
                // dayArr.eth = out.eth / count;
            // }
        // }
        // console.log("dayArr: ", dayArr);
        // outArr.push(dayArr);
    // }
    // console.log("outArr: ", outArr);


    // 訂閱Events
    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (訂閱Events)
    //====|=========================================================================
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "訂閱Events");
    console.log("=".repeat(100));
    var ws = new Web3('wss://ropsten.infura.io/ws');

    let F3DeventsContract = JSON.parse(fs.readFileSync('./build/contracts/F3Devents.json', 'utf8'));
    let F3Devents = new ws.eth.Contract(F3DeventsContract.abi, FoMo3DlongContractAddress);

    F3Devents.events.onEndTx({
    fromBlock: 0
        // toBlock: 'latest'
    }, function(error, event){ console.log(event); })
    .on('data', event => {
        console.log(event); // same results as the optional callback above
    })
    .on('error', error => {
        console.log(error);
    })
    .on('end', event => {
        console.log(event);
    });

    F3Devents.events.onWithdrawAndDistribute({
    fromBlock: 0
        // toBlock: 'latest'
    }, function(error, event){ console.log(event); })
    .on('data', event => {
        console.log("on data:========================");
        console.log(event); // same results as the optional callback above
    })
    .on('error', error => {
        console.log(error);
    })
    .on('end', event => {
        console.log("on end:========================");
        console.log(event);
    });




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

    var FoMo3DlongContract = JSON.parse(fs.readFileSync('./build/contracts/FoMo3Dlong.json', 'utf8'));
    FoMo3Dlong = new web3.eth.Contract(FoMo3DlongContract.abi, FoMo3DlongContractAddress);


    console.log();
    rID = await FoMo3Dlong.methods.rID_().call();
    console.log(`第[${rID}]輪遊戲`);

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
    console.log("seedpot: ".padEnd(20) + round.seedpot);
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
        gas: gas
    };
    FoMo3Dlong.methods.buyXid(0,team).send(txnObject, (err, result) => {
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
        gas: gas
    };
    FoMo3Dlong.methods.buyXid(0,team).send(txnObject, (err, result) => {
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

}
