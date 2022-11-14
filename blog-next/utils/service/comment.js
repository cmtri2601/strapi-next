import axios from 'axios'
import { API } from '../../environment'

/**
 * Create comment for a post
 * param: post id
 */
export const createComment = async (postId, content) => {
  try {
    const res = await axios.post(API + '/comments', {
      "data": {
          "content": content,
          "postId": {
              "id": postId
          }
      }
    });
    return {
      updatedAt: res.data.data.attributes.updatedAt,
      content: res.data.data.attributes.content
    }
  } catch (error) {
    console.log(error.message);
  }
}

