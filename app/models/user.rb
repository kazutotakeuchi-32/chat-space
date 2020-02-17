class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :nickname,presence: true

  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
  def self.search(input, id)
    return nil if input == ""
    User.where(['nickname LIKE ?', "%#{input}%"] ).where.not(id: id).limit(10)
  end
end