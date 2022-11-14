import axios from 'axios'
import { API } from '../../environment'

/**
 * 
 * @returns 
 */
export const getAllPost = async () => {
  const { data: {data: posts} } = await axios.get(API + '/posts');
  return posts
}

/**
 * 
 * @param {*} title 
 * @param {*} content 
 * @returns 
 */
export const createPost = async (title, content, slug) => {
  try {
    const res = await axios.post(API + '/posts', {
      "data": {
        "Title": title,
        "Content": content,
        "Slug": slug,
      }
    });
    return res
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 
 * @param {*} id 
 * @param {*} likePost 
 * @returns 
 */
export const updateLike = async (id, likePost) => {
  try {
    const res = await axios.put(API + '/posts/' + id, {
      "data": {
          "like": ++likePost
      }
    })

    const { data: {
      attributes: {
        like: like
      }
    }} = res.data
    
    return like;
  } catch (error) {
    console.log(error.message);
  }
}
