import {useDispatch, useSelector} from "react-redux";
import {Form, PageItem, Pagination, Row, Spinner, Button, Alert} from "react-bootstrap";
import {fetchPostsAction} from "../../store/main/sagaActions";
import {useEffect, useState} from "react";
import {getSorting} from "../../store/main/reducer";
import {
  currentPageSelector,
  dataSelector,
  errorSelector,
  isFetchingErrorSelector,
  isLoadedSelector,
  pageSizeSelector,
  pagesSelector,
  sortingHandlerSelector,
  totalCountSelector
} from "../../store/main/selectors";
import PostCard from "./PostCard";

export const Posts = () => {
  const data = useSelector(dataSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const pageSize = useSelector(pageSizeSelector);
  const currentPage = useSelector(currentPageSelector);
  const totalCount = useSelector(totalCountSelector);
  const pages = useSelector(pagesSelector);
  const isFetchingError = useSelector(isFetchingErrorSelector);
  const error = useSelector(errorSelector);
  const sortingHandler = useSelector(sortingHandlerSelector);
  const dispatch = useDispatch();
  const [searchByHeader, setSearchByHeader] = useState('');

  useEffect(() => {
    dispatch(fetchPostsAction( currentPage, pageSize, searchByHeader, sortingHandler ? '' : 'desc' ));
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
            type={'submit'}
            onClick={(e) => {
              e.preventDefault()
              dispatch( fetchPostsAction( currentPage, pageSize, searchByHeader, sortingHandler ? '' : 'desc' ))
            }}
          >
            Search
          </Button>
        </Form>
        <Form.Label className={'d-flex justify-content-start m-2'}>
          Total posts: { totalCount }
        </Form.Label>
      </div>
      <Row className={'justify-content-between'}>
        { isLoaded ?
          data.map(postItem =>
            <PostCard
              key={ postItem.post.id }
              postItem={ postItem }
            />)
            :
            <div className={'d-flex h-6 justify-content-center align-items-center'}>
              <Spinner/>
            </div>
        }
      </Row>
      <Pagination className={'d-flex justify-content-center'}>
        { isLoaded &&
          pages.map( pageNumber =>
            <PageItem
              key={ pageNumber }
              className={'mt-2'}
              onClick={ () =>
                dispatch(fetchPostsAction(pageNumber === 1 ? 0 : pageNumber * 10 - 10,
                  pageSize,
                  searchByHeader,
                  sortingHandler ? '' : 'desc')
                )
              }
            >
              { pageNumber }
            </PageItem>
          )
        }
      </Pagination>
      { isFetchingError &&
        <Alert variant={'danger'}>
          { error }
        </Alert>
      }
    </>
  );
};

