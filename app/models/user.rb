# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone_number    :integer
#  email           :string
#  full_name       :string           not null
#  website         :string
#  bio             :string
#  gender          :string
#  profile_picture :string
#

# tests
# BOTH PHONE NUMBER AND EMAIL
# User.new(username: "test", password: "password", phone_number: "1234567890", email: "asdfa@asdfa.com", full_name: "dude dude")
# ONLY EMAIL
# User.new(username: "test", password: "password", email: "asdfa@asdfa.com", full_name: "dude dude")
# ONLY PHONE NUMBER
# User.new(username: "test", password: "password", phone_number: "1234567890", full_name: "dude dude")
# NEITHER EMAIL OR PHONE NUMBER
# User.new(username: "test", password: "password", full_name: "dude dude")

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, presence: true, unless: :phone_number?
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create
  validates :phone_number, presence: true, unless: :email?
  validates :full_name, presence: true

  after_initialize :ensure_session_token
  attr_reader :password

  has_many :posts,
    foreign_key: :author_id,
    class_name: :Post

  has_many :images

  has_many :likes

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.update(session_token: self.class.generate_session_token)
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
