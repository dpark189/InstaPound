import { merge } from 'lodash';
import { fetchPosts, fetchFeedPosts } from '../../actions/post_actions';
import { createLike, deleteLike } from '../../actions/like_actions';
import PostIndex from './post_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {

  const allPosts = Object.values(state.entities.posts) || {};
  let posts;
  if (ownProps.match.path === "/hashtag/:hashtag"){
    posts = allPosts.filter( (post) => {
      if (post.hashtags.includes(`#${ownProps.match.params.hashtag}`)) {
        return post;
      }
    });
  } else if (ownProps.match.path === '/') {
    posts = allPosts.filter( (post) => {
      if (state.entities.users[state.session.id].followeeIds.includes(post.author_id)) {
       return post;
      }
    });
  } else { posts = allPosts;}

  posts.sort((post1, post2) => {
    return new Date(post2.updated_at) - new Date(post1.updated_at);}
  );

  const users = state.entities.users;

  return {
    posts,
    users,
    currentUserId: state.session.id
  };
};




const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeedPosts: (userId, postOffset) => dispatch(fetchFeedPosts(userId, postOffset)),
    createLike: (likedType, likedId, currentUserId) => dispatch(createLike(likedType, likedId, currentUserId)),
    deleteLike: (likedType, likedId, currentUserId) => dispatch(deleteLike(likedType, likedId, currentUserId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostIndex));
