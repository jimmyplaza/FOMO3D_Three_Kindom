#!/bin/sh
cat migrate.log | grep 'FoMo3Dlong: 0x' | awk '{print $ 2}'


