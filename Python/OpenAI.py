from openai import OpenAI
import os  

OpenAI.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

OpenAI.api_key = 'sk-proj-cGfR1TnezgPdMgWIWNhwT3BlbkFJzCPMy0qR0TD8RJY7hDgUq'

def make_md(msg):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "今からmdファイルのテンプレートとそれに入れてほしい内容を渡すのでテンプレートに沿った形に直してください"},
        {"role": "user", "content": '''## 2024年/07月/30日 日報
## P:本日の計画
<span style="font-size: 80%; "><span style="color: #999999; ">本日の予定の部分からのコピペ</span></span>

|              |      |              | 
| ------------ | ---- | ------------ | 
| x            | 重要 | 重要ではない | 
| 緊急         |      |              | 
| 緊急ではない |      |              | 

チェックリスト
- [ ] 
- [ ] 
- [ ] 
- [ ] 
## D:業務中の進捗報告
<span style="font-size: 80%; "><span style="color: #999999; ">本日の予定のスレッドの進捗報告をコピぺ</span></span>


## C: 達成度チェック　
<span style="font-size: 80%; "><span style="color: #999999; ">Pがどれほど終わったかのチェック</span></span>

チェックリスト
- [ ] 
- [ ] 
- [ ] 
- [ ] 
## A: 取り組みのよかった点と反省
<span style="font-size: 80%; "><span style="color: #999999; ">良かった場合は何がきっかけで良くなったのか、反省点の場合は何が原因かで生じたのかを記載する</span></span>
### 良かった点


### 反省点


## 学んだこと
<span style="font-size: 80%; "><span style="color: #999999; ">学んだことがあったら積極的に記載</span></span>


## ひとことメモ

<span style="font-size: 80%; "><span style="color: #999999; ">コミュニケーション活性化のため、皆さんに共有したいことや気になっていることを記載してみて下さい✨</span></span>'''},
        {"role": "user", "content": msg}
    ]
    )
    return completion.choices[0].message.content

print(make_md('''0830-1230
PythonでOpenAI apiをたたけるようにする
md の効率のいい書き方を考える,OpenAI apiはたたけました
簡単でした。
リターンが文字列なのでカンマ区切りで出してsplit()かけることでリストで返せるようになりました。
課題点としては日報生成の手法をどうするかでスレッドへの返信などをすべて抽出して保存し、生成するか
特定の方法で追記可能にしてほとんどAIにたよらずに作るかで悩んでます'''))
