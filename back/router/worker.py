from fastapi import APIRouter
from contract import *
from pydantic import BaseModel


class Worker(BaseModel):
    name: str


router = APIRouter(prefix="/employee", tags=["employee"])


@router.get("/")
def index():
    return getWorkersList()


@router.post("/")
def index(employee: Worker):
    return setWorker(employee.name)
