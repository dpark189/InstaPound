import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions/post_actions';
import { fetchUser } from '../../actions/user_actions';
import { createLike, deleteLike } from '../../actions/like_actions';
import { Link } from 'react-router-dom';
import UserProfilePicture from '../user/user_profile_picture';
import CommentIndex from '../comment/comment_index';
import CreateCommentFormContainer from '../comment/create_comment_form_container';

class PostExploreItemShow extends React.Component {
  constructor(props) {
    super(props);
    let likedStatus;

    if ((props.post.likes_count === 0) || !props.post.likes_by_user_id) {
      likedStatus = false;
    } else {
      if (Object.values(props.post.likes_by_user_id).includes(props.currentUserId)){
        likedStatus = true;
      } else {
        likedStatus = false;
      }
    }

    this.state = {
      likedStatus
    };
    this.state.fade = false;
    this.fadingDone = this.fadingDone.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.liking;
		elm.addEventListener('animationend', this.fadingDone);
  }

  componentWillUnmount () {
    const elm = this.refs.liking;
    elm.removeEventListener('animationend', this.fadingDone);
  }

  fadingDone () {
    this.setState({fade: false});
  }

  handleLikeClick(e) {
    this.setState({fade: true});
    if ((typeof this.props.post.likes_by_user_id === 'undefined') ||
      (typeof this.props.post.likes_by_user_id[this.props.currentUserId] === 'undefined')
    ) {
      this.props.createLike("Post", this.props.post.id, this.props.currentUserId).then(
        this.setState({likedStatus: false})
      );
    } else {
      this.props.deleteLike("Post", this.props.post.likes_by_user_id[this.props.currentUserId].like_id).then(
        this.setState({likedStatus: true})
      );
    }
  }


  // componentDidUpdate(prevProps, prevState) {
  //   if ((typeof this.props.post.likes_by_user_id === 'undefined') ||
  //     (typeof this.props.post.likes_by_user_id[this.props.currentUserId] === 'undefined')
  //   ) {
  //       this.setState({likedStatus: false});
  //     } else {
  //       this.setState({likedStatus: true});
  //     }
  // }

  componentWillReceiveProps(newProps) {
    if ((typeof newProps.post.likes_by_user_id === 'undefined') ||
      (typeof newProps.post.likes_by_user_id[newProps.currentUserId] === 'undefined')
    ) {
        this.setState({likedStatus: false});
      } else {
        this.setState({likedStatus: true});
      }
  }

  render() {
    let images;

    const fade = this.state.fade;

    if ((typeof this.props.post.photos === "undefined" ) ||
    (Object.values(this.props.post.photos).length === 0 ) ||
    (typeof this.props.post.photos === "null")) {
      images = "";
    } else {
      images = Object.values(this.props.post.photos).map( (photoUrl, i) => {
        return (
          <img key={i} className="post-explore-image" src={photoUrl}/>
        );
      });
    }
    const likeCount = this.props.post.likes_count;

    return(
      <div className="post-explore-item-show-div">
        <section className="post-explore-images" onDoubleClick={this.handleLikeClick}>
          <i ref='liking' className={`${fade ? 'fade' : ''} fas fa-heart post-icons like-icon-picture`}></i>
          {images}
        </section>

        <div className="post-explore-item-show-info">
          <section className="post-header">
            <div className="post-user-info">
              <UserProfilePicture user={this.props.author} />
              <Link className="user-show-page-link" to={`/users/${this.props.author.id}`}>
                <strong>{this.props.author.username}</strong>
              </Link>
            </div>
          </section>

          <section className="post-index-item-caption">
            <span>
              <strong>{this.props.author.username} </strong>{this.props.post.caption}
            </span>
            <CommentIndex
              commentIds={this.props.post.commentIds}
              parentType="Post"
              parentId={this.props.post.id}
            />
          </section>

            <section className="post-sub-header">
              <div className="post-icon-links">
                  <i
                    onClick={this.handleLikeClick}
                    className={`far fa-heart post-icons ${this.state.likedStatus}-like-icon`}
                    >
                  </i>
                <i className="far fa-comment post-icons"></i>
              </div>
              <div className="post-sub-header-likes">
                <strong>{likeCount} likes</strong>
              </div>

              <div className="update-date">
                {this.props.post.updated_at}
              </div>
            </section>

          <section className="index-item-comment">
            <CreateCommentFormContainer
              parentType="Post"
              parentId={this.props.post.id}
            />
          </section>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {

  const dummyPost = {
    id: "",
    author_id: state.session.id,
    caption: "",
    photos: {photoUrl: ""},
    commentIds: [],
    likes_by_user_id: "",
    likes_count: 0
  };
  const post = ownProps.post || dummyPost;
  return {
    post: post
  };
};

const mdp = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    createLike: (likedType, likedId, currentUserId) => dispatch(createLike(likedType, likedId, currentUserId)),
    deleteLike: (likedType, likedId, currentUserId) => dispatch(deleteLike(likedType, likedId, currentUserId))
  };
};

export default connect(msp, mdp)(PostExploreItemShow);
