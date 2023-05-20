from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.worker import router as worker_router
from router.product import router as product_router

app = FastAPI()
app.include_router(worker_router)
app.include_router(product_router)


@app.get("/")
def index():
    return {"Yo, heyo!"}


origins = ["http://localhost:3000/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
