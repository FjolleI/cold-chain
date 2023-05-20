from fastapi import APIRouter
from contract import *
from pydantic import BaseModel


class Product(BaseModel):
    name: str
    price: str
    description: str
    reqTemp: str
    manufacturing: str


class Status(BaseModel):
    location: str
    temperature: str
    humidity: str
    heatIndex: str
    workerId: int
    productId: int
    totalQuantity: int
    flag: bool


class Data(BaseModel):
    temperature: int
    humidity: int
    heatIndex: int
    productId: int


router = APIRouter(prefix="/product", tags=["product"])


@router.get("/")
def index():
    return getProducts()


@router.get("/status/{id}")
def index(id: int):
    return getProductStatus(id)


@router.post("/")
def index(prod: Product):
    return addProduct(
        prod.name,
        prod.price,
        prod.description,
        prod.reqTemp,
        prod.manufacturing,
    )


@router.post("/status")
def index(stat: Status):
    return addStatus(
        stat.location,
        stat.temperature,
        stat.humidity,
        stat.heatIndex,
        stat.workerId,
        stat.productId,
        stat.totalQuantity,
        stat.flag,
    )


@router.post("/data")
def index(data: Data):
    return addData(
        data.temperature, 
        data.humidity, 
        data.heatIndex, 
        data.productId
    )


@router.get("/data/{id}")
def index(id: int):
    return getProductData(id)
