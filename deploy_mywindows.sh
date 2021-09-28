#!/bin/sh

#ganache-cli -l 471238800 -g 1 # 開啟 testrpc 同時設定 gasLimit 和 gasPrice
rm -rf build
truffle compile
truffle migrate --network mywindows > migrate.log
ADDR="$(./getContractAddress.sh)"
echo $ADDR

JSPATH="src/js/bundle.js"
echo Change contract address to $ADDR at $JSPATH
sed -i "" "74369s/address:.*/address: \"$ADDR\"/" src/js/bundle.js # 非 mac 去除 -i 后的 ""





