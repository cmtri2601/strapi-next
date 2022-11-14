import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'
import { API } from '../environment'
import Link from 'next/link'
import AddPostButton from '../components/addPostButton'
import { getAllPost } from '../utils/service/post'

export default function Home({posts}) {
  const [postList, setPostList] = useState(posts);

  const updatePosts = async () => {
    const res = await getAllPost();
    setPostList(res);
  }

  return (
    <div className={styles.container}>
      <h1>This is strapi-next bog</h1>
      <AddPostButton updatePosts={updatePosts}/>
      {
        postList.map(post => ( 
          <li key={post.id}>
            <Link href={`/${post.id}`}>
              <h3>{post.attributes.Title}</h3>
              <p>{post.attributes.Content}</p>
            </Link>
          </li>
        ))
      }
    </div>  
  )
}

export const getServerSideProps = async () => {
  const { data: {data: posts} } = await axios.get(API + '/posts');

  return {
    props: {posts}
  }
}