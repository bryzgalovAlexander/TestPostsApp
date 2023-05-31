import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com'

export const getPaginatedPostsAPI = async ( currentPage, pageSize, searchByHeader, sorting ) => axios
  .get(`${url}/posts?_start=${currentPage}&_limit=${pageSize}&title_like=${searchByHeader}&_sort=title&_order=${sorting}`)
  .then( res => { return { posts: res.data, totalCount: res.headers['x-total-count'] }})
export const fetchCommentsAPI = async ( id ) => axios.get(`${url}/posts/${id}/comments`)
export const fetchUserInfoAPI = async ( userId ) => axios.get(`${url}/users/${userId}`)
export const fetchUserCommentsAPI = async ( userId ) => axios.get(`${url}/users/${userId}/posts`)
