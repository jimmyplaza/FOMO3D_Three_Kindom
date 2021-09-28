#!/bin/sh
# rm -rf build
# truffle compile
# truffle migrate --reset --dry-run --network rinkeby 
# truffle migrate --reset --network rinkeby
ADDR="0x0Bf600E1f1e7AFB06aa6FF2A7e67Dc15d2c21C31"
echo $ADDR

JSPATH="src/js/bundle.js"
echo Change contract address to $ADDR at $JSPATH
sed -i "" "74369s/address:.*/address: \"$ADDR\"/" src/js/bundle.js # 非 mac 去除 -i 后的 ""
