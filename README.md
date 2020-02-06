# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル

|Column|Type|Options|
|--------|-------|----------|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
-  has_many : groups_users
-  has_many : groups through: :  groups_users
-  has_many : meassages




## groups_users

|Column|Type|Options|
|------|--------|-------------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users




## groupsテーブル

|Column|Type|Options|
|----------|------|-----------|
|chat-name|string|null: false|

### Association
-  has_many : groups_users
-  has_many : users through: :  groups_users
-  has_many : meassages

## meassagesテーブル

|Column|Type|Options|
|------|-----|---------------|
|body|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users