// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColdChain {
    address private contractOwner;
    uint256 private productCounter = 0;

    struct Product {
        uint256 id;
        string name;
        string price;
        string description;
        string reqTemp;
        string manufacturing;
        uint256 timestamp;
    }

    Product[] public productList;
    mapping(uint256 => Product) private products;

    struct Status {
        string location;
        uint256 timestamp;
        string temperature;
        string humidity;
        string heatIndex;
        uint256 workerId;
        uint256 productId;
        uint256 totalQuantity;
        bool flag;
    }

    Status[] public productStatusList;
    mapping(uint256 => Status[]) private productStatus;

    uint256 private workerCounter = 0;

    struct Worker {
        string name;
        uint256 id;
        uint256 timestamp;
    }

    Worker[] public workerList;
    mapping(uint256 => Worker) private workers;

    struct Data {
        uint256 temperature;
        uint256 humidity;
        uint256 heatIndex;
        uint256 productId;
    }

    Data[] public dataList;
    mapping(uint256 => Data[]) private productData;

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only contract owner can call this function."
        );
        _;
    }

    function setWorker(string memory name) public payable {
        Worker memory newWorker = Worker(name, workerCounter, block.timestamp);
        workers[workerCounter] = newWorker;
        workerList.push(newWorker);
        workerCounter++;
    }

    function addProduct(
        string memory name,
        string memory price,
        string memory description,
        string memory reqTemp,
        string memory manufacturing
    ) public payable {
        Product memory newProduct = Product(
            productCounter,
            name,
            price,
            description,
            reqTemp,
            manufacturing,
            block.timestamp
        );
        products[productCounter] = newProduct;
        productList.push(newProduct);
        productCounter++;
    }

    function addStatus(
        string memory location,
        string memory temperature,
        string memory humidity,
        string memory heatIndex,
        uint256 workerId,
        uint256 productId,
        uint256 totalQuantity,
        bool flag
    ) public payable {
        Status memory newStatus = Status(
            location,
            block.timestamp,
            temperature,
            humidity,
            heatIndex,
            workerId,
            productId,
            totalQuantity,
            flag
        );
        productStatus[productId].push(newStatus);
        productStatusList.push(newStatus);
    }

    function addData(
        uint256 temperature,
        uint256 humidity,
        uint256 heatIndex,
        uint256 productId
    ) public payable {
        Data memory newData = Data(temperature, humidity, heatIndex, productId);
        productData[productId].push(newData);
        dataList.push(newData);
    }

    function getWorkersList() public view returns (Worker[] memory) {
        return workerList;
    }

    function getProductStatus(
        uint256 id
    ) public view returns (Status[] memory) {
        return productStatus[id];
    }

    function getProductData(uint256 id) public view returns (Data[] memory) {
        return productData[id];
    }

    function getProducts() public view returns (Product[] memory) {
        return productList;
    }
}
