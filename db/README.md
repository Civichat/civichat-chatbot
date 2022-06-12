# DB

## DBMSについて
- このプロジェクトではPostgreSQLを採用しています

### 開発時の動作方法について 
1. `<project root>/.env.sample`をコピーして`.env`として保存する
1. `RDS_HOSTNAME`を`localhost`にする
1. `docker-compose up -d`
1. `localhost:5432` にDBが立つ. 

## スキーマについて
- DBのスキーマは、`sql/00_shcema.sql`により定義されます
