import subprocess
import json

# チームドメインとアクセストークンを設定
team_domain = 'dynamis'  # ここを適切なチームドメインに置き換えてください
access_token = 'YpUNmBWq9Woj4BOhGMlpNkWNBjGst9eBl100H9YaPww9xdAhL3vtiO3NWsXyhTkH'  # ここを適切なアクセストークンに置き換えてください

def send2notePM(data):
    # JSONデータを定義
    json_data = {
        "note_code": "df4ffd8562",
        "folder_id": 417096,
        "title": "test",
        "body": data,
    }
    json_string = json.dumps(json_data, ensure_ascii=False)
    # curlコマンドを定義
    curl_command = [
        'curl',
        '-X', 'POST',
        f'https://{team_domain}.notepm.jp/api/v1/pages',
        '-H', f'Authorization: Bearer {access_token}',
        '-H', 'Content-Type: application/json',
        '-d', json_string
    ]

    # subprocess.runを使ってコマンドを実行
    result = subprocess.run(curl_command, capture_output=True, text=True)

    # コマンドの出力結果を表示
    print(result)
    print("stdout:", result.stdout)
    print("stderr:", result.stderr)
