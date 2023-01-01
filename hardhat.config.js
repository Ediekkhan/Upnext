require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox')

const { REACT_APP_ALCHEMY_PK, REACT_APP_PK } = process.env

const polygonUrl = `https://polygon-mumbai.g.alchemy.com/v2/${REACT_APP_ALCHEMY_PK}`

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'polygon_mumbai',
  networks: {
    polygon_mumbai: {
      url: polygonUrl,
      accounts: [REACT_APP_PK],
      gas: 50000,
      gasPrice: 8000000000
    }
  },
  paths: {
    artifacts: './src/artifacts'
  }
};
