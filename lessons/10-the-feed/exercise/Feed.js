import React, { useState, useEffect } from 'react';
import FeedPost from 'app/FeedPost';
import { loadFeedPosts, subscribeToNewFeedPosts } from 'app/utils';
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed;

function Feed() {
  const [limit, setLimit] = useState(3);
  const [time, setTime] = useState(Date.now());
  const [posts, setPosts] = useState(null);
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    let isCurrent = true;

    loadFeedPosts(time, limit).then(posts => {
      if (isCurrent) {
        setPosts(posts);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [time, limit]);

  useEffect(() => subscribeToNewFeedPosts(time, setNewPosts), [time]);

  const feedPosts =
    posts && posts.map(post => <FeedPost post={post} key={post.id} />);

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        {newPosts.length > 0 && (
          <button className="Feed_new_posts_button icon_button">
            View 3 New Posts
          </button>
        )}
      </div>

      {feedPosts}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            setLimit(limit + 3);
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
}
