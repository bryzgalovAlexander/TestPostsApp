export const sagaActions = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  FETCH_USER_INFO: 'FETCH_USER_INFO',
};

export const fetchPostsAction = ( currentPage, pageSize, searchByHeader, sorting ) => ({
  type: sagaActions.FETCH_DATA,
  currentPage,
  pageSize,
  searchByHeader,
  sorting
})

export const fetchCommentsAction = ( payload ) => ({
  type: sagaActions.FETCH_COMMENTS,
  payload,

})

export const fetchUserInfoAction = ( payload ) => ({
  type: sagaActions.FETCH_USER_INFO,
  payload
})
