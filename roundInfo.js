const Web3 = require('web3');
const moment = require('moment');
var fs = require('fs');
// local config
var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
var FoMo3DlongContractAddress = '0x9efa9b6ab3b7f02603cb7093bb5b3eb571e662be';
//

// My Windows config
// var web3 = new Web3(Web3.givenProvider || "http://10.10.30.49:8545");
// var FoMo3DlongContractAddress = '0xa1609a36e813837c55e76c6d5f354896c2aaa2ff';

var gasPrice = "100";
var gas =  630643;
var usrMap= {};
usrMap[0] = 'whale';
usrMap[1] = 'bear';
usrMap[2] = 'snake';
usrMap[3] = 'bull';



function Unix_timestamp(t)
{
    var dt = new Date(t*1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
}

async function allBalance(){
    console.log();
    console.log("所有玩家餘額");
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

    accounts = await web3.eth.getAccounts();
    banker = accounts[0];
    whale = accounts[1];
    bear = accounts[2];
    snake = accounts[3];
    bull = accounts[4];
    referee = accounts[5];
    allbuyer = accounts[6];

    console.log("banker地址: ".padEnd(20) + banker);
    console.log("whale地址: ".padEnd(20) + whale);
    console.log("bear地址: ".padEnd(20) + bear);
    console.log("snake地址: ".padEnd(20) +  snake);
    console.log("bull地址: ".padEnd(20) + bull);
    console.log("referee地址: ".padEnd(20) + referee);
    console.log("allbuyer地址: ".padEnd(20) + allbuyer);
    console.log();

    await allBalance();

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
    console.log("key的數量:          ".padEnd(20) +  web3.utils.fromWei(round.keys, 'ether'));
    var eth = web3.utils.fromWei(round.eth,'ether')
    console.log("總共的ETH:          ".padEnd(20) + eth + " (ETH)");
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

    console.log("領先玩家資訊- pID: " + round.plyr);
    plyr = await FoMo3Dlong.methods.plyr_(round.plyr).call()
    console.log(plyr);


    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "空投資訊");
    console.log("=".repeat(100));

    airDropPot_wei = await FoMo3Dlong.methods.airDropPot_().call()
    airDropPot = web3.utils.fromWei(airDropPot_wei, 'ether')
    console.log("airDropPot: ", airDropPot);

    airDropTracker_wei = await FoMo3Dlong.methods.airDropTracker_().call()
    console.log("airDropTracker wei: ", airDropTracker_wei);
    airDropTracker = web3.utils.fromWei(airDropTracker_wei, 'ether')
    console.log("airDropTracker: ", airDropTracker);

}


async function main() {

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (Settting Accounts)
    //====|=========================================================================
    FoMo3Dlong = await defaultAccount();

    //==============================================================================
    //     _    |_ |. _   |`    _  __|_. _  _  _  .
    //    |_)|_||_)||(_  ~|~|_|| |(_ | |(_)| |_\  .  (買Key時間是否有增加)
    //====|=========================================================================
    console.log("\n");
    console.log("=".repeat(100));
    console.log(" ".repeat(50) + "買Key");
    console.log("=".repeat(100));

    // 遊戲未啟動
    activated = await FoMo3Dlong.methods.activated_().call();
    console.log("遊戲啟動與否: ", activated);

    keyPrice = await FoMo3Dlong.methods.getBuyPrice().call()
    console.log("現在Key的價錢(wei): ", keyPrice);


    await allBalance();

    await roundInfo();
}

main()


