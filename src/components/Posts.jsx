import {useDispatch, useSelector} from "react-redux";
import {Card, Form, PageItem, Pagination, Row, Spinner, Button, Alert, OverlayTrigger, Popover} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetchCommentsAction, fetchPostsAction, fetchUserInfoAction} from "../saga/actions";
import {useEffect, useState} from "react";
import {getSorting, showHandle} from "../store/slice";

export const Posts = () => {
  const data = useSelector(store => store.reducer.data);
  const isLoaded = useSelector(store => store.reducer.isLoaded);
  const pageSize = useSelector(store => store.reducer.pageSize);
  const currentPage = useSelector(store => store.reducer.currentPage);
  const totalCount = useSelector(store => store.reducer.totalCount);
  const pages = useSelector(store => store.reducer.pages);
  const isFetchingError = useSelector(store => store.reducer.isFetchingError);
  const error = useSelector(store => store.reducer.error);
  const sortingHandler = useSelector(store => store.reducer.sortingHandler);
  const dispatch = useDispatch();
  const [searchByHeader, setSearchByHeader] = useState('');

  useEffect(() => {
    dispatch(fetchPostsAction(currentPage, pageSize, searchByHeader, sortingHandler ? '' : 'desc'));
  }, [sortingHandler])

  return (
    <>
      <h1>Posts</h1>
      <div className={'d-flex align-items-center justify-content-start'}>
        <Button
          className={'mb-2'}
          onClick={() => dispatch(getSorting())}
        >
          {sortingHandler ? 'Asc' : 'Desc' }
        </Button>
        <Form className={'d-flex justify-content-start mb-2'}>

          <Form.Control
            type="search"
            className="form-control w-75"
            onChange={(e) => setSearchByHeader(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              dispatch(fetchPostsAction(currentPage, pageSize, searchByHeader, sortingHandler ? '' : 'desc'))}
            }
            type={'submit'}
          >
            Search
          </Button>
        </Form>
        <Form.Label className={'d-flex justify-content-start m-2'}>Total posts: {totalCount}</Form.Label>
      </div>

      <Row className={'justify-content-between'}>
        { isLoaded ?
          data.map(postItem =>
              <Card
                key={postItem.post.id}
                className={'col-lg-6 col-sm-auto flex-row p-2 d-flex align-items-start '}
              >
                <Card.Body className={'w-25 d-flex justify-content-center align-items-center'}>
                  <Link
                    to={'/info'}
                    className={'d-flex justify-content-center'}
                  >
                    <Card.Img
                      src={'/user.png'}
                      className={'w-100 card-img img-fluid '}
                      onClick={() => dispatch(fetchUserInfoAction(postItem.post.userId)) }
                    />
                  </Link>
                </Card.Body>
                <Card.Body className={'w-100 p-2 '}>
                  <Card.Title>{postItem.post.title}</Card.Title>
                  <Card.Text>{postItem.post.body}</Card.Text>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      show={postItem.showHandler}
                      overlay={
                        <Popover>
                          { postItem.comments.map(comment => (
                            <>
                              <Popover.Header as="h3">{comment.email}</Popover.Header>
                              <Popover.Body>{comment.body}</Popover.Body>
                            </>
                            ))}
                        </Popover>
                      }
                    >
                      <Button
                        className={ postItem.isLoadedComments ? 'primary' : 'disabled'}
                        onClick={() => {
                          !postItem.comments.length ? dispatch(fetchCommentsAction(postItem.post.id)) : dispatch(showHandle(postItem.post.id)) }}>
                        Comments
                      </Button>
                    </OverlayTrigger>
                </Card.Body>
              </Card>)
            :
            <div className={'d-flex h-6 justify-content-center align-items-center'}>
              <Spinner/>
            </div>
        }
      </Row>
      <Pagination className={'d-flex justify-content-center'}>
        { isLoaded &&
          pages.map(pageNumber =>
            <PageItem
              key={pageNumber}
              className={'mt-2'}
              onClick={() => dispatch(fetchPostsAction(pageNumber === 1 ? 0 : pageNumber * 10 - 10, pageSize, searchByHeader, sortingHandler ? '' : 'desc'))}
            >
              {pageNumber}
            </PageItem>)
        }
      </Pagination>
      { isFetchingError && <Alert variant={'danger'}>{error}</Alert> }
    </>
  );
};

