import React, { useState, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {AiFillLike} from 'react-icons/ai'

import { API } from '../environment'
import { updateLike } from '../utils/service/post'
import { createComment } from '../utils/service/comment'

const Post = ({post, comments}) => {
  const [like, setLike] = useState(post.attributes.like);
  const [commentList, setCommentList] = useState(comments);
  const commentRef = useRef();

  const handleLike = async () => {
    const res = await updateLike(post.id, like);
    if (res) setLike(res);
  }

  const handleComment = async e => {
    e.preventDefault();
    
    //Get comment
    const comment = commentRef.current.value;
    if (!comment) return;
    //create comment by service
    const res = await createComment(post.id, comment);
    console.log("Comment: ",res)
    if (res) setCommentList([res, ...commentList]);
    //reset input field
    commentRef.current.value = '';
  }

  console.log("Comment List: ", commentList);

  return (
    <main>
      <Link href="/" >
        <h1 style={{color: 'blue'}}>
          Home
        </h1>
      </Link>
      <article>
        <h2>{post.attributes.Title}</h2>
        <p>{post.attributes.Content}</p>
        <section className='like-section'>
          <button onClick={handleLike}>
            <AiFillLike/>
          </button>
          <p>&nbsp;{like} Like</p>
        </section>
        <section className='comment-section'>
          <h3>Comment section:</h3>
          <form onSubmit={handleComment}>
            <input 
              ref={commentRef}
              type='text' 
              placeholder='Enter your comment...'
            />
            <button type='submit'>Comment</button>
            {
              commentList.map(comment => (
                <li key = {`${comment.updatedAt}`}>
                  <time>{comment.updatedAt}</time>
                  <p>{comment.content}</p>
                </li>
              ))
            }
          </form>
        </section>
      </article>
    </main>
  )
}

export const getStaticPaths = async () => {
  const { data: {data: posts} } = await axios.get(API + '/posts');
  const paths = posts.map(post => ({
    params: {
      post: String(post.id)
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  const { post: idPost } = params;
  const { data: {data: post} } = await axios.get(API + '/posts/' + idPost);
  const res = await axios.get(API + '/comments?populate=*');
  const comments = 
    res.data.data
      .filter(comment => {
        return comment.attributes.postId.data.id.toString() === idPost;
      })
      .map(comment => ({
        updatedAt: comment.attributes.updatedAt,
        content: comment.attributes.content
      }))
      .reverse();

  console.log("Comments: ", comments);
  return { props: {post, comments}};
}

export default Post;