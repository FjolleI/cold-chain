# cold-chain
Drug counterfeit dApp using blockchain

## Getting Started
1. Setup MetaMask
2. Enable Goerli Testnet
3. Get test-ethers from Goerli Faucet: https://goerlifaucet.com/
4. Deploy contract (e.g. using Hardhat or https://remix.ethereum.org/)
5. Create a new file in the root directory of the project called .env:
    
On the .env file add the following keys:

        ALCHEMY_KEY=your_alchemy_key
        (get your alchemy key after creating an app here: https://dashboard.alchemy.com/apps)
        PRIVATE_KEY=
        ACCOUNT_ADDRESS=
        CONTRACT_ADDRESS=
        MNEMONIC=

    Replace your_alchemy_key with your Alchemy API key, and so on.


## Running the Application
Note: 
If you're using a virtual environment, activate it before running the application.

Then install the requirements:

cd back

pip install -r requirements.txt

## Backend API
To start the backend server:

uvicorn main:app --reload

Now you can access the Swagger documentation at:

http://localhost:8000/docs

## Node-RED
To run Node-RED, use the following command:

node-red

Node-RED will start and be accessible through the browser at http://127.0.0.1:1880/

Import the flow which is on the root folder 'node-red-flow.json'

## Frontend
Install dependencies:

cd front

npm install

To start the frontend application, use the following command:

npm start

The frontend will be available in the browser at http://localhost:3000
