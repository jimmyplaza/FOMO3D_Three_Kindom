const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'your self 12 chars';


var rinkeby_private_key = "43c8d637524f737f34ebcd4f75f7b6b8b46d38b53d386acdaf78fd12a4ab12bf";
var rinkeby_infura_url = "https://rinkeby.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e";

var ropsten_private_key = "bbeaebebee24f2090e5f9ad149ac04b4152f3813ddc676884ba5db4ba82c6c81";
var ropsten_infura_url = "https://ropsten.infura.io/v3/29710281c8d740a5bb82bcb707a9f74e";

var mainnet_private_key = "COMPANY_DEPLOY_PRIVATEKEY";
var mainnet_infura_url = "https://mainnet.infura.io/v3/2584141d5b494519a5addb924a8efdc5";


module.exports = {
    networks: {
        // development: {
            // host: "127.0.0.1",
            // port: 8545, //7545 for ganache
            // gas: 6521975,
            // network_id: "*" // Match any network id
        // },
        development: {
            host: "127.0.0.1",
            port: 8545, //7545 for ganache
            gas: 6500000,
            gasPrice: 100000000000,
            network_id: "*" // Match any network id
        },
        mywindows: {
            host: "10.0.30.239",
            port: 8545, //7545 for ganache
            gas: 7500000,
            network_id: "*" // Match any network id
        },
        rinkeby: {
         gas: 6500000,
         gasPrice: 100000000000,
         provider: function() {
            return new HDWalletProvider(rinkeby_private_key, rinkeby_infura_url)
         },
         network_id: 4
        },
        ropsten: {
         gas: 6500000,
         gasPrice: 100000000000,
         provider: function() {
            return new HDWalletProvider(ropsten_private_key, ropsten_infura_url)
         },
         network_id: 3,
         from: "0x5b7b446BAf2afEBf3c1321F3C43BDC30009cB920"
        },
        mainnet: {
            gas: 7500000,
            gasPrice: 6000000000,
            provider: function() {
                return new HDWalletProvider(mainnet_private_key,  mainnet_infura_url)
            },
            network_id: 1
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
