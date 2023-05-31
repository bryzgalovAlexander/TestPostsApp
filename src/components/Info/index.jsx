import {Alert, Button, Card, Placeholder, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getUserDataFromLocalStorage} from "../../store/main/reducer";
import {useEffect} from "react";
import {
  errorSelector,
  infoSelector,
  isFetchingErrorSelector,
  isLoadedSelector,
  userPostsSelector
} from '../../store/main/selectors'

export const Info = () => {
  const info = useSelector(infoSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const isFetchingError = useSelector(isFetchingErrorSelector);
  const error = useSelector(errorSelector);
  const userPosts = useSelector(userPostsSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDataFromLocalStorage())
  }, [])

  return (
    <>
      <div>
        <h1>Info</h1>
        <Link to={'/'}>
          <Button className={'mb-2'}>
            Back
          </Button>
        </Link>
      </div>
      { isLoaded ?
        <>
          <Card style={{width: "18rem", marginBottom: "1rem"}}>
            <Card.Img className={'img-fluid w-25 m-3'} variant="top" src="user.png"/>
            <Card.Body>
              <Card.Title>{info.name}</Card.Title>
              <Card.Text>
                { "UserName: " + info.username }<br/>
                { "E-mail: " + info.email }<br/>
                { "Phone: " + info.phone }<br/>
              </Card.Text>
            </Card.Body>
          </Card>
          <h2 className={'mb-4'}>All posts by {info.name}</h2>
          {
            userPosts.map(userPost => (
              <Card key={userPost.id} className={'mb-2 p-2'}>
                <Card.Title>{userPost.title}</Card.Title>
                <Card.Text>{userPost.body}</Card.Text>
              </Card>
            ))
          }
        </>
        :
        <>
          <Card style={{ width: "18rem", marginBottom: "1rem" }}>
            <div className={'img-fluid w-100 m-3'}>
              <Spinner className={'m-3'}/>
            </div>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6}/>
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                <Placeholder xs={6}/> <Placeholder xs={8}/>
              </Placeholder>
            </Card.Body>
          </Card>
          <Placeholder as={Card.Title} animation={'glow'}>
            <Placeholder xs={4} size={'lg'}/>
          </Placeholder>
          <Spinner className={'mt-4'}/>
        </>
      }
      {
        isFetchingError &&
        <Alert variant={'danger'}>
          { error }
        </Alert>
      }
    </>
  );
};
