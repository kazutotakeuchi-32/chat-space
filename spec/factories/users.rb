# 定義特に意味はない
FactoryBot.define do
# usermの中で
  factory :user do
    # パスワードが8文字以内ではなければ省く
    # Fakerダミーの生成も行っている。
    password = Faker::Internet.password(min_length: 8)

    name {Faker::Name.last_name}
    # Fakerダミーの生成
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end
end