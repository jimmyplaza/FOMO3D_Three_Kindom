* [F3Devents](#f3devents)
  * [onNewName](#event-onnewname)
  * [onEndTx](#event-onendtx)
  * [onWithdraw](#event-onwithdraw)
  * [onWithdrawAndDistribute](#event-onwithdrawanddistribute)
  * [onBuyAndDistribute](#event-onbuyanddistribute)
  * [onReLoadAndDistribute](#event-onreloadanddistribute)
  * [onAffiliatePayout](#event-onaffiliatepayout)
  * [onPotSwapDeposit](#event-onpotswapdeposit)
* [FoMo3Dlong](#fomo3dlong)
  * [getBuyPrice](#function-getbuyprice)
  * [name](#function-name)
  * [reLoadXname](#function-reloadxname)
  * [activate](#function-activate)
  * [pIDxAddr_](#function-pidxaddr_)
  * [airDropTracker_](#function-airdroptracker_)
  * [Jekyll_Island_Inc](#function-jekyll_island_inc)
  * [round_](#function-round_)
  * [plyrNames_](#function-plyrnames_)
  * [fees_](#function-fees_)
  * [pIDxName_](#function-pidxname_)
  * [playerBook](#function-playerbook)
  * [reLoadXid](#function-reloadxid)
  * [withdraw](#function-withdraw)
  * [registerNameXaddr](#function-registernamexaddr)
  * [receivePlayerInfo](#function-receiveplayerinfo)
  * [otherF3D_](#function-otherf3d_)
  * [rndTmEth_](#function-rndtmeth_)
  * [rID_](#function-rid_)
  * [getPlayerVaults](#function-getplayervaults)
  * [registerNameXname](#function-registernamexname)
  * [getCurrentRoundInfo](#function-getcurrentroundinfo)
  * [reLoadXaddr](#function-reloadxaddr)
  * [owner](#function-owner)
  * [buyXid](#function-buyxid)
  * [receivePlayerNameList](#function-receiveplayernamelist)
  * [registerNameXID](#function-registernamexid)
  * [symbol](#function-symbol)
  * [buyXaddr](#function-buyxaddr)
  * [plyrRnds_](#function-plyrrnds_)
  * [buyXname](#function-buyxname)
  * [potSplit_](#function-potsplit_)
  * [getTimeLeft](#function-gettimeleft)
  * [calcKeysReceived](#function-calckeysreceived)
  * [iWantXKeys](#function-iwantxkeys)
  * [activated_](#function-activated_)
  * [Divies](#function-divies)
  * [airDropPot_](#function-airdroppot_)
  * [plyr_](#function-plyr_)
  * [potSwap](#function-potswap)
  * [getPlayerInfoByAddress](#function-getplayerinfobyaddress)
  * [setPlayerBook](#function-setplayerbook)
  * [onNewName](#event-onnewname)
  * [onEndTx](#event-onendtx)
  * [onWithdraw](#event-onwithdraw)
  * [onWithdrawAndDistribute](#event-onwithdrawanddistribute)
  * [onBuyAndDistribute](#event-onbuyanddistribute)
  * [onReLoadAndDistribute](#event-onreloadanddistribute)
  * [onAffiliatePayout](#event-onaffiliatepayout)
  * [onPotSwapDeposit](#event-onpotswapdeposit)
* [PlayerBookInterface](#playerbookinterface)
  * [isDev](#function-isdev)
  * [getNameFee](#function-getnamefee)
  * [getPlayerAddr](#function-getplayeraddr)
  * [registerNameXnameFromDapp](#function-registernamexnamefromdapp)
  * [getPlayerName](#function-getplayername)
  * [registerNameXaddrFromDapp](#function-registernamexaddrfromdapp)
  * [registerNameXIDFromDapp](#function-registernamexidfromdapp)
  * [getPlayerLAff](#function-getplayerlaff)
  * [getPlayerID](#function-getplayerid)
* [F3DKeysCalcLong](#f3dkeyscalclong)
* [F3Ddatasets](#f3ddatasets)
* [NameFilter](#namefilter)
* [SafeMath](#safemath)

# F3Devents

## *event* onNewName

F3Devents.onNewName(playerID, playerAddress, playerName, isNewPlayer, affiliateID, affiliateAddress, affiliateName, amountPaid, timeStamp) `dd617643`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | playerID | indexed |
| *address* | playerAddress | indexed |
| *bytes32* | playerName | indexed |
| *bool* | isNewPlayer | not indexed |
| *uint256* | affiliateID | not indexed |
| *address* | affiliateAddress | not indexed |
| *bytes32* | affiliateName | not indexed |
| *uint256* | amountPaid | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onEndTx

F3Devents.onEndTx(compressedData, compressedIDs, playerName, playerAddress, ethIn, keysBought, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount, potAmount, airDropPot) `500e72a0`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *bytes32* | playerName | not indexed |
| *address* | playerAddress | not indexed |
| *uint256* | ethIn | not indexed |
| *uint256* | keysBought | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |
| *uint256* | potAmount | not indexed |
| *uint256* | airDropPot | not indexed |

## *event* onWithdraw

F3Devents.onWithdraw(playerID, playerAddress, playerName, ethOut, timeStamp) `8f36579a`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | playerID | indexed |
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethOut | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onWithdrawAndDistribute

F3Devents.onWithdrawAndDistribute(playerAddress, playerName, ethOut, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `0bd0dba8`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethOut | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onBuyAndDistribute

F3Devents.onBuyAndDistribute(playerAddress, playerName, ethIn, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `a7801a70`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethIn | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onReLoadAndDistribute

F3Devents.onReLoadAndDistribute(playerAddress, playerName, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `88261ac7`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onAffiliatePayout

F3Devents.onAffiliatePayout(affiliateID, affiliateAddress, affiliateName, roundID, buyerID, amount, timeStamp) `590bbc0f`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | affiliateID | indexed |
| *address* | affiliateAddress | not indexed |
| *bytes32* | affiliateName | not indexed |
| *uint256* | roundID | indexed |
| *uint256* | buyerID | indexed |
| *uint256* | amount | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onPotSwapDeposit

F3Devents.onPotSwapDeposit(roundID, amountAddedToPot) `74b1d2f7`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | roundID | not indexed |
| *uint256* | amountAddedToPot | not indexed |


---
# FoMo3Dlong


## *function* getBuyPrice

FoMo3Dlong.getBuyPrice() `view` `018a25e8`

> return the price buyer will pay for next 1 individual key. -functionhash- 0x018a25e8



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* name

FoMo3Dlong.name() `view` `06fdde03`





## *function* reLoadXname

FoMo3Dlong.reLoadXname(_affCode, _team, _eth) `nonpayable` `079ce327`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes32* | _affCode | undefined |
| *uint256* | _team | undefined |
| *uint256* | _eth | undefined |


## *function* activate

FoMo3Dlong.activate() `nonpayable` `0f15f4c0`





## *function* pIDxAddr_

FoMo3Dlong.pIDxAddr_() `view` `10f01eba`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* airDropTracker_

FoMo3Dlong.airDropTracker_() `view` `11a09ae7`





## *function* Jekyll_Island_Inc

FoMo3Dlong.Jekyll_Island_Inc() `view` `21ec5981`





## *function* round_

FoMo3Dlong.round_() `view` `24c33d33`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* plyrNames_

FoMo3Dlong.plyrNames_(, ) `view` `2660316e`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *bytes32* |  | undefined |


## *function* fees_

FoMo3Dlong.fees_() `view` `2ce21999`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* pIDxName_

FoMo3Dlong.pIDxName_() `view` `2e19ebdc`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes32* |  | undefined |


## *function* playerBook

FoMo3Dlong.playerBook() `view` `2fa241fc`





## *function* reLoadXid

FoMo3Dlong.reLoadXid(_affCode, _team, _eth) `nonpayable` `349cdcac`

> essentially the same as buy, but instead of you sending ether  from your wallet, it uses your unwithdrawn earnings. -functionhash- 0x349cdcac (using ID for affiliate) -functionhash- 0x82bfc739 (using address for affiliate) -functionhash- 0x079ce327 (using name for affiliate)

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _affCode | the ID/address/name of the player who gets the affiliate fee |
| *uint256* | _team | what team is the player playing for? |
| *uint256* | _eth | amount of earnings to use (remainder returned to gen vault) |


## *function* withdraw

FoMo3Dlong.withdraw() `nonpayable` `3ccfd60b`

> withdraws all of your earnings. -functionhash- 0x3ccfd60b




## *function* registerNameXaddr

FoMo3Dlong.registerNameXaddr(_nameString, _affCode, _all) `payable` `3ddd4698`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _nameString | undefined |
| *address* | _affCode | undefined |
| *bool* | _all | undefined |


## *function* receivePlayerInfo

FoMo3Dlong.receivePlayerInfo(_pID, _addr, _name, _laff) `nonpayable` `49cc635d`

> receives name/player info from names contract 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |
| *address* | _addr | undefined |
| *bytes32* | _name | undefined |
| *uint256* | _laff | undefined |


## *function* otherF3D_

FoMo3Dlong.otherF3D_() `view` `4da3b6db`





## *function* rndTmEth_

FoMo3Dlong.rndTmEth_(, ) `view` `5893d481`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *uint256* |  | undefined |


## *function* rID_

FoMo3Dlong.rID_() `view` `624ae5c0`





## *function* getPlayerVaults

FoMo3Dlong.getPlayerVaults(_pID) `view` `63066434`

> returns player earnings per vaults  -functionhash- 0x63066434

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |

## *function* registerNameXname

FoMo3Dlong.registerNameXname(_nameString, _affCode, _all) `payable` `685ffd83`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _nameString | undefined |
| *bytes32* | _affCode | undefined |
| *bool* | _all | undefined |


## *function* getCurrentRoundInfo

FoMo3Dlong.getCurrentRoundInfo() `view` `747dff42`

> returns all current round info needed for front end -functionhash- 0x747dff42



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *address* |  | undefined |
| *bytes32* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |

## *function* reLoadXaddr

FoMo3Dlong.reLoadXaddr(_affCode, _team, _eth) `nonpayable` `82bfc739`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _affCode | undefined |
| *uint256* | _team | undefined |
| *uint256* | _eth | undefined |


## *function* owner

FoMo3Dlong.owner() `view` `8da5cb5b`





## *function* buyXid

FoMo3Dlong.buyXid(_affCode, _team) `payable` `8f38f309`

> converts all incoming ethereum to keys. -functionhash- 0x8f38f309 (using ID for affiliate) -functionhash- 0x98a0871d (using address for affiliate) -functionhash- 0xa65b37a1 (using name for affiliate)

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _affCode | the ID/address/name of the player who gets the affiliate fee |
| *uint256* | _team | what team is the player playing for? |


## *function* receivePlayerNameList

FoMo3Dlong.receivePlayerNameList(_pID, _name) `nonpayable` `8f7140ea`

> receives entire player name list 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |
| *bytes32* | _name | undefined |


## *function* registerNameXID

FoMo3Dlong.registerNameXID(_nameString, _affCode, _all) `payable` `921dec21`

> use these to register names.  they are just wrappers that will send the registration requests to the PlayerBook contract.  So registering here is the  same as registering there.  UI will always display the last name you registered. but you will still own all previously registered names to use as affiliate  links. - must pay a registration fee. - name must be unique - names will be converted to lowercase - name cannot start or end with a space  - cannot have more than 1 space in a row - cannot be only numbers - cannot start with 0x  - name must be at least 1 char - max length of 32 characters long - allowed characters: a-z, 0-9, and space -functionhash- 0x921dec21 (using ID for affiliate) -functionhash- 0x3ddd4698 (using address for affiliate) -functionhash- 0x685ffd83 (using name for affiliate)

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _nameString | players desired name |
| *uint256* | _affCode | affiliate ID, address, or name of who referred you |
| *bool* | _all | set to true if you want this to push your info to all games  (this might cost a lot of gas) |


## *function* symbol

FoMo3Dlong.symbol() `view` `95d89b41`





## *function* buyXaddr

FoMo3Dlong.buyXaddr(_affCode, _team) `payable` `98a0871d`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _affCode | undefined |
| *uint256* | _team | undefined |


## *function* plyrRnds_

FoMo3Dlong.plyrRnds_(, ) `view` `a2bccae9`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *uint256* |  | undefined |


## *function* buyXname

FoMo3Dlong.buyXname(_affCode, _team) `payable` `a65b37a1`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes32* | _affCode | undefined |
| *uint256* | _team | undefined |


## *function* potSplit_

FoMo3Dlong.potSplit_() `view` `c519500e`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* getTimeLeft

FoMo3Dlong.getTimeLeft() `view` `c7e284b8`

> returns time left.  dont spam this, you'll ddos yourself from your node  provider -functionhash- 0xc7e284b8



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* calcKeysReceived

FoMo3Dlong.calcKeysReceived(_rID, _eth) `view` `ce89c80c`

> returns the amount of keys you would get given an amount of eth.  -functionhash- 0xce89c80c

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _rID | round ID you want price for |
| *uint256* | _eth | amount of eth sent in  |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* iWantXKeys

FoMo3Dlong.iWantXKeys(_keys) `view` `cf808000`

> returns current eth price for X keys.   -functionhash- 0xcf808000

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _keys | number of keys desired (in 18 decimal format) |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* activated_

FoMo3Dlong.activated_() `view` `d53b2679`





## *function* Divies

FoMo3Dlong.Divies() `view` `d7f9d655`





## *function* airDropPot_

FoMo3Dlong.airDropPot_() `view` `d87574e0`





## *function* plyr_

FoMo3Dlong.plyr_() `view` `de7874f3`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* potSwap

FoMo3Dlong.potSwap() `payable` `ed78cf4a`





## *function* getPlayerInfoByAddress

FoMo3Dlong.getPlayerInfoByAddress(_addr) `view` `ee0b5d8b`

> returns player info based on address.  if no address is given, it will  use msg.sender  -functionhash- 0xee0b5d8b

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _addr | address of the player you want to lookup  |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *bytes32* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |
| *uint256* |  | undefined |

## *function* setPlayerBook

FoMo3Dlong.setPlayerBook(_playerBook) `nonpayable` `f2f40420`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _playerBook | undefined |



## *event* onNewName

FoMo3Dlong.onNewName(playerID, playerAddress, playerName, isNewPlayer, affiliateID, affiliateAddress, affiliateName, amountPaid, timeStamp) `dd617643`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | playerID | indexed |
| *address* | playerAddress | indexed |
| *bytes32* | playerName | indexed |
| *bool* | isNewPlayer | not indexed |
| *uint256* | affiliateID | not indexed |
| *address* | affiliateAddress | not indexed |
| *bytes32* | affiliateName | not indexed |
| *uint256* | amountPaid | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onEndTx

FoMo3Dlong.onEndTx(compressedData, compressedIDs, playerName, playerAddress, ethIn, keysBought, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount, potAmount, airDropPot) `500e72a0`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *bytes32* | playerName | not indexed |
| *address* | playerAddress | not indexed |
| *uint256* | ethIn | not indexed |
| *uint256* | keysBought | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |
| *uint256* | potAmount | not indexed |
| *uint256* | airDropPot | not indexed |

## *event* onWithdraw

FoMo3Dlong.onWithdraw(playerID, playerAddress, playerName, ethOut, timeStamp) `8f36579a`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | playerID | indexed |
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethOut | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onWithdrawAndDistribute

FoMo3Dlong.onWithdrawAndDistribute(playerAddress, playerName, ethOut, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `0bd0dba8`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethOut | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onBuyAndDistribute

FoMo3Dlong.onBuyAndDistribute(playerAddress, playerName, ethIn, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `a7801a70`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | ethIn | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onReLoadAndDistribute

FoMo3Dlong.onReLoadAndDistribute(playerAddress, playerName, compressedData, compressedIDs, winnerAddr, winnerName, amountWon, newPot, P3DAmount, genAmount) `88261ac7`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | playerAddress | not indexed |
| *bytes32* | playerName | not indexed |
| *uint256* | compressedData | not indexed |
| *uint256* | compressedIDs | not indexed |
| *address* | winnerAddr | not indexed |
| *bytes32* | winnerName | not indexed |
| *uint256* | amountWon | not indexed |
| *uint256* | newPot | not indexed |
| *uint256* | P3DAmount | not indexed |
| *uint256* | genAmount | not indexed |

## *event* onAffiliatePayout

FoMo3Dlong.onAffiliatePayout(affiliateID, affiliateAddress, affiliateName, roundID, buyerID, amount, timeStamp) `590bbc0f`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | affiliateID | indexed |
| *address* | affiliateAddress | not indexed |
| *bytes32* | affiliateName | not indexed |
| *uint256* | roundID | indexed |
| *uint256* | buyerID | indexed |
| *uint256* | amount | not indexed |
| *uint256* | timeStamp | not indexed |

## *event* onPotSwapDeposit

FoMo3Dlong.onPotSwapDeposit(roundID, amountAddedToPot) `74b1d2f7`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | roundID | not indexed |
| *uint256* | amountAddedToPot | not indexed |


---
# PlayerBookInterface


## *function* isDev

PlayerBookInterface.isDev(_who) `view` `0c3f64bf`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _who | undefined |


## *function* getNameFee

PlayerBookInterface.getNameFee() `view` `2614195f`





## *function* getPlayerAddr

PlayerBookInterface.getPlayerAddr(_pID) `view` `4d0d35ff`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |


## *function* registerNameXnameFromDapp

PlayerBookInterface.registerNameXnameFromDapp(_addr, _name, _affCode, _all) `payable` `745ea0c1`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _addr | undefined |
| *bytes32* | _name | undefined |
| *bytes32* | _affCode | undefined |
| *bool* | _all | undefined |


## *function* getPlayerName

PlayerBookInterface.getPlayerName(_pID) `view` `82e37b2c`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |


## *function* registerNameXaddrFromDapp

PlayerBookInterface.registerNameXaddrFromDapp(_addr, _name, _affCode, _all) `payable` `aa4d490b`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _addr | undefined |
| *bytes32* | _name | undefined |
| *address* | _affCode | undefined |
| *bool* | _all | undefined |


## *function* registerNameXIDFromDapp

PlayerBookInterface.registerNameXIDFromDapp(_addr, _name, _affCode, _all) `payable` `c0942dfd`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _addr | undefined |
| *bytes32* | _name | undefined |
| *uint256* | _affCode | undefined |
| *bool* | _all | undefined |


## *function* getPlayerLAff

PlayerBookInterface.getPlayerLAff(_pID) `view` `e3c08adf`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _pID | undefined |


## *function* getPlayerID

PlayerBookInterface.getPlayerID(_addr) `nonpayable` `e56556a9`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _addr | undefined |


---
# F3DKeysCalcLong


---
# F3Ddatasets


---
# NameFilter


---
# SafeMath


---