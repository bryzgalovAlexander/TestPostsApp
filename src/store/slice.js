import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  data: [],
  isLoaded: true,
  isShownComments: false,
  isFetchingError: false,
  error: '',
  info: {},
  userPosts: [],
  pages: [],
  pageSize: 10,
  currentPage: 0,
  totalCount: 0,
  sortingHandler: true,
}

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getPostSuccess(state, action) {
      state.error = ''
      state.info = {}
      state.pages = []
      state.userPosts = []
      state.isFetchingError = false;
      state.isLoaded = true
      state.data = action.payload.map(
        post =>
        { return {
          post,
          comments: [],
          isLoadedComments: true,
          showHandler: false
        }})
      state.totalCount = Number(action.payload.totalCount)
    },
    getComments(state, action) {
      state.error = ''
      state.isFetchingError = false;
      state.isShownComments = true
      state.data.map(postItem => {
        if (postItem.post.id === action.payload[0].postId) {
          postItem.showHandler = false
          postItem.comments = action.payload;
          postItem.isLoadedComments = true;
          postItem.showHandler = !postItem.showHandler
          }
      })
    },
    showHandle(state, action) {
      state.data.map(postItem => {
        if (postItem.post.id === action.payload) {
          postItem.showHandler = !postItem.showHandler
        }
      })
    },
    isLoadedCommentFalse(state, action) {
      state.data.find(postItem => {
        if (postItem.post.id === action.payload) {
          postItem.isLoadedComments = false
        }
      })
    },
    isLoadedFalse(state) {
      state.isLoaded = false
    },
    getInfoUser(state, action) {
      state.error = ''
      state.isLoaded = true
      state.info = action.payload
      state.pages = []
    },
    paginate(state, action) {
      state.totalCount = action.payload
      const countOfPages = Math.ceil(state.totalCount/state.pageSize)
      for (let i = 1; i <= countOfPages; i++) {
        state.pages.push(i)
      }
    },
    updateLocalStorage(state) {
      localStorage.setItem('userData', JSON.stringify({userPosts: state.userPosts, userInfo: state.info}))
    },
    getUserDataFromLocalStorage(state) {
      state.userPosts = JSON.parse(localStorage.getItem('userData')).userPosts;
      state.info = JSON.parse(localStorage.getItem('userData')).userInfo;
    },
    getAllUserPosts(state, action) {
      state.userPosts = action.payload
    },
    getError(state, action) {
      state.isFetchingError = true;
      state.isLoaded = true
      state.error = action.payload;
      state.pages = [];
      state.data = []
    },
    getSorting(state) {
      state.sortingHandler = !state.sortingHandler;
    },
  },
})

export const {
  getPostSuccess,
  getSorting,
  isLoadedFalse,
  getComments,
  isLoadedCommentFalse,
  getInfoUser,
  paginate,
  getError,
  getAllUserPosts,
  showHandle,
  updateLocalStorage,
  getUserDataFromLocalStorage
} = slice.actions
export default slice.reducer
