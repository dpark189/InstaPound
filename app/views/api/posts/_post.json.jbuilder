json.extract! passed, :id, :author_id, :caption
json.photos do
  passed.photos.each do |photo|
    json.photoUrl url_for(photo)
  end
end
json.updated_at passed.updated_at.strftime("%B %e, %Y")
json.commentIds do
  json.array! passed.comments.ids
end