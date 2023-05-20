require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};

require("dotenv").config();

task("accounts", "Show accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ALCHEMY_API_KEY = process.env.ALCHEMY_KEY;
const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: "./front/src/artifacts",
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
};
