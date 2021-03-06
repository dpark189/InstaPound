# == Schema Information
#
# Table name: comments
#
#  id                  :bigint(8)        not null, primary key
#  author_id           :integer
#  commented_item_id   :integer
#  body                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  commented_item_type :string
#

class Comment < ApplicationRecord
  validates :body, :commented_item_type, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :commented_item,
    polymorphic: true

  has_many :child_comments, as: :commented_item,
  foreign_key: :commented_item_id,
  class_name: :Comment

  has_many :likes, as: :liked_item
end
