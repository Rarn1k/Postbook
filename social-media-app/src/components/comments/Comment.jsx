import React, { useContext } from "react";
import { LikeFilled } from "@ant-design/icons";
import { Image, Card, Dropdown, Button } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateComment from "./UpdateComment";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import Moment from "react-moment";

function Comment(props) {
  const { postId, comment, refresh } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${postId}/comment/${comment.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${postId}/comment/${comment.id}/`)
      .then(() => {
        setToaster({
          type: "danger",
          message: "Комментарий удалён 🚀",
          show: true,
          title: "Успех",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "warning",
          message: "Не удалось удалить комментарий",
          show: true,
          title: "Ошибка",
        });
      });
  };

  return (
    <Card className="rounded-3 my-2" data-testid="comment-test">
      <Card.Body>
        <Card.Title className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <Image
              src={comment.author.avatar}
              roundedCircle
              width={48}
              height={48}
              className="me-2 border border-primary border-2"
            />
            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
              <p className="fs-6 m-0">{comment.author.name}</p>
              <p className="fs-6 fw-lighter">
                <Moment locale="ru" fromNow className="small">{comment.created}</Moment>
              </p>
            </div>
          </div>
          {user.name === comment.author.name && (
            <div>
              <Dropdown>
                <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <UpdateComment
                    comment={comment}
                    refresh={refresh}
                    postId={postId}
                  />
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Card.Title>
        <Card.Text>{comment.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
        <Button
          style={{
            borderColor: "lightgray",
          }}
          className="d-flex flex-row "
          variant="light"
          onClick={() => {
            if (comment.liked) {
              handleLikeClick("remove_like");
            } else {
              handleLikeClick("like");
            }
          }}
        >
          <LikeFilled
            style={{
              width: "28px",
              height: "28px",
              padding: "2px",
              fontSize: "24px",
              color: comment.liked ? "#0D6EFD" : "#C4C4C4",
            }}
          />
          <p className="ms-1">
            <small>{comment.likes_count}</small>
          </p>
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Comment;
