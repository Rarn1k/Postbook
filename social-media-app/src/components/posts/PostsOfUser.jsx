import React, { useContext } from "react";
import { LikeFilled, CommentOutlined } from "@ant-design/icons";
import { Image, Card, Dropdown, Button } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import Moment from "react-moment";

function PostOfUser(props) {
  const { post, refresh, isSinglePost, user } = props;
  const { setToaster } = useContext(Context);

  const author = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(() => {
        setToaster({
          type: "warning",
          message: "Запись удалена 🚀",
          show: true,
          title: "Успех",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "Не удалось удалить запись",
          show: true,
          title: "Ошибка",
        });
      });
  };

  return (
    <>
      {user.name === post.author.name && (
        <Card className="rounded-3 my-4">
          <Card.Body>
            <Card.Title className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <Image
                  src={post.author.avatar}
                  roundedCircle
                  width={48}
                  height={48}
                  className="me-2 border border-primary border-2"
                />
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                  <p className="fs-6 m-0">{post.author.name}</p>
                  <p className="fs-6 fw-lighter">
                    <Moment locale="ru" fromNow className="small">{post.created}</Moment>
                  </p>
                </div>
              </div>
              {author.name === post.author.name && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdatePost post={post} refresh={refresh} />
                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              )}
            </Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex bg-white border-0">
          <Button
            style={{
              borderColor: "lightgray",
            }}
            className="d-flex flex-row "
            variant="light"
            onClick={() => {
              if (post.liked) {
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
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
            />
            <p className="ms-1">
              <small>{post.likes_count}</small>
            </p>
          </Button>
          {!isSinglePost && (
            <Button
              style={{
                borderColor: "lightgray",
              }}
              className="d-flex flex-row mx-2"
              variant="light"
              href={`/post/${post.id}/`}
            >
              <div className="d-flex flex-row">
                <CommentOutlined
                  style={{
                    width: "28px",
                    height: "28px",
                    padding: "2px",
                    fontSize: "24px",
                    color: "#C4C4C4",
                  }}
                />
                <p className="ms-1 mb-0">
                  <small>{post.comments_count}</small>
                </p>
              </div>
            </Button>
          )}
        </Card.Footer>
        </Card>
      )}
    </>
  );
}

export default PostOfUser;
