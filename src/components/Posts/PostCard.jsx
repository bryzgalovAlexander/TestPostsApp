import React from 'react';
import {Button, Card, OverlayTrigger, Popover} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetchCommentsAction, fetchUserInfoAction} from "../../store/main/sagaActions";
import {showHandle} from "../../store/main/reducer";
import {useDispatch} from "react-redux";

const PostCard = ({ postItem }) => {
  const dispatch = useDispatch();

  return (
    <Card className={'col-lg-6 col-sm-auto flex-row p-2 d-flex align-items-start'}>
      <Card.Body className={'w-25 d-flex justify-content-center align-items-center'}>
        <Link
          to={'/info'}
          className={'d-flex justify-content-center'}
        >
          <Card.Img
            src={'/user.png'}
            className={'w-100 card-img img-fluid '}
            onClick={() => dispatch(fetchUserInfoAction( postItem.post.userId ))}
          />
        </Link>
      </Card.Body>
      <Card.Body className={'w-100 p-2 '}>
        <Card.Title>{ postItem.post.title }</Card.Title>
        <Card.Text>{ postItem.post.body }</Card.Text>
        <OverlayTrigger
          trigger="click"
          placement="right"
          show={ postItem.showHandler }
          overlay={
            <Popover>
              { postItem.comments.map(comment => (
                <div key={ comment.id }>
                  <Popover.Header as="h3">{ comment.email }</Popover.Header>
                  <Popover.Body>{ comment.body }</Popover.Body>
                </div>
              ))}
            </Popover>
          }
        >
          <Button
            className={ postItem.isLoadedComments ? 'primary' : 'disabled'}
            onClick={() => {
              !postItem.comments.length ? dispatch(fetchCommentsAction( postItem.post.id )) : dispatch(showHandle( postItem.post.id )) }}>
            Comments
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
