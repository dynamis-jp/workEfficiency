from mdutils.mdutils import MdUtils
import datetime 
import os 
#参考ページhttps://qiita.com/key353/items/f557168ff30419a63ec1
def generate_report(user_name, Content):
    #export_pathはユーザー名
    #最終出力先はユーザー名/日付.md
    dt = datetime.datetime.now()
    year = str(dt.year)
    month = str(dt.month)
    day = str(dt.day)
    export_path = f"./{user_name}/{month}_{day}.md"
    
    os.makedirs(os.path.dirname(export_path), exist_ok=True)
    mdFile = MdUtils(file_name=export_path, title=f"日報 {year}年{month}月{day}日")
    
    # はじめに
    mdFile.new_header(level=1, title='本日の計画')
    mdFile.new_line(f"\n{Content}")

    
    # ファイルを生成する
    mdFile.create_md_file()
    return export_path