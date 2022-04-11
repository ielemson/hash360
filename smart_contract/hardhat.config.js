// https://eth-ropsten.alchemyapi.io/v2/0NCM1xYnaw3ilawHMOE3KMl9H-_lfgTd

// plugin used in hardhart to build smart contract tests
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity:'0.8.0',
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/0NCM1xYnaw3ilawHMOE3KMl9H-_lfgTd',
      accounts:['0ad1535dd50a3e2145e297ee987786fcb67459d590649e2c65e9b8899c36f1dd']
    }
  }
}