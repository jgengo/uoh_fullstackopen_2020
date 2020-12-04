import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const payload = {
    title: newObject.title,
    url: newObject.url,
    author: newObject.author,
    likes: newObject.likes,
    // I don't need user (or any other field than likes)
    // because I dev like god, but anyway let's keep title, author, url just in case)
    // ^ (it's ironic obviously, hein? you get it?)
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, payload, config)
  return response.data

}


const destroy = async(blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response
}

export default { getAll, create, update, destroy, setToken }