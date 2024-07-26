from flask import Flask, request, jsonify
import socket
from notePM import send2notePM
from generate_md import generate_report

app = Flask(__name__)

@app.route('/post', methods=['POST'])
def post_request():
    data = request.json  # JSONデータを取得
    userName = data['userName']
    content = data['val']
    path = generate_report(userName,content)
    md_data = md2str(path) 
    send2notePM(md_data)
    # コンソールに出力
    print(f'Received POST request with data: {data}')
    
    return jsonify({'message': 'Data received', 'data': data}), 200

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
    
    app.run(debug=True, host='0.0.0.0', port=port)
