from fastapi import FastAPI, Request
from pydantic import BaseModel
from notePM import send2notePM
from generate_md import generate_report
import socket
import uvicorn

app = FastAPI()

class PostData(BaseModel):
    userName: str
    val: str

@app.post("/post")
async def post_request(data: PostData):
    userName = data.userName
    content = data.val
    path = generate_report(userName, content)
    md_data = md2str(path)
    send2notePM(md_data)
    
    # コンソールに出力
    print(f'Received POST request with data: {data}')
    
    return {"message": "Data received", "data": data.dict()}

def md2str(path):
    with open(path) as f:
        l = f.readlines()
        md_text = "".join(l)
    return md_text

if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    port = 5000
    
    print(f'Starting server at IP address: {local_ip} on port {port}')
    
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="debug")
