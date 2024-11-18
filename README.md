# サービス名
学習記録アプリ
# サービスの機能
- 学習内容と学習時間の登録
- 学習内容と学習時間の削除
- 学習時間の合計値の表示
# 環境設定の方法
.envに以下の内容を設定してください。
```
VITE_SUPABASE_URL="SupabaseのProject URL"
VITE_SUPABASE_ANON_KEY="SupabaseのProject API Keys"
```
# 起動の仕方
```
$ git clone https://github.com/ritsu21ctws/study-record.git
$ cd study-record
$ npm i
$ npm run dev
```
# テスト
```
$ npm run test
```