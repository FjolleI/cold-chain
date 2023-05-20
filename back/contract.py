import time
from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account
import json
from dotenv import load_dotenv
import os

load_dotenv()

ALCHEMY_API_KEY = os.getenv("ALCHEMY_KEY")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

w3 = Web3(Web3.HTTPProvider(f"https://eth-goerli.g.alchemy.com/v2/{ALCHEMY_API_KEY}"))

w3.middleware_onion.inject(geth_poa_middleware, layer=0)

with open("ColdChainABI.json", encoding="utf-8") as f:
    abi = json.load(f)

key = PRIVATE_KEY
account = w3.toChecksumAddress(ACCOUNT_ADDRESS)
address = w3.toChecksumAddress(CONTRACT_ADDRESS)

deployed_contract = w3.eth.contract(address=address, abi=abi)


def call_contract_function(function_name, *args):
    function = getattr(deployed_contract.functions, function_name)
    result = function(*args).call()
    return result


def transact_with_contract(function_name, *args):
    transaction = getattr(deployed_contract.functions, function_name)(
        *args
    ).buildTransaction({"from": account})
    transaction.update({"nonce": w3.eth.get_transaction_count(account)})
    signed_tx = w3.eth.account.sign_transaction(transaction, key)
    txn_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    return txn_receipt


def setWorker(name):
    return transact_with_contract("setWorker", name)


def addProduct(name, price, description, reqTemp, manufacturing):
    return transact_with_contract(
        "addProduct", name, price, description, reqTemp, manufacturing
    )


def addStatus(
    location, temperature, humidity, heatIndex, workerId, productId, totalQuantity, flag
):
    return transact_with_contract(
        "addStatus",
        location,
        temperature,
        humidity,
        heatIndex,
        workerId,
        productId,
        totalQuantity,
        flag,
    )


def addData(temperature, humidity, heatIndex, productId):
    return transact_with_contract(
        "addData", temperature, humidity, heatIndex, productId
    )


def getProductsList():
    return call_contract_function("getProductsList")


def getWorkersList():
    return call_contract_function("getWorkersList")


def getProductStatus(productId):
    return call_contract_function("getProductStatus", productId)


def getProductData(productId):
    return call_contract_function("getProductData", productId)


def getProducts():
    return call_contract_function("getProducts")
