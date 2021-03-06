json.user do
  json.partial! 'api/users/user', user: @user
end

 json.posts do
   if @user.posts
     @user.posts.order('updated_at DESC').each do |post|
       json.set! post.id do
       json.partial! 'api/posts/post', passed: post
       end
     end
   else
     {}
   end
 end
