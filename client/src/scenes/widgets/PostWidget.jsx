import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import SendIcon from "@mui/icons-material/Send";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const patchLike = async () => {
    try {
      const response = await fetch(
        `http://lynx-social-media-app-bay.vercel.app/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      if (response.ok) {
        dispatch(setPost({ post: await response.json() }));
      } else {
        console.error("Failed to update like status");
      }
      // const updatedPost = await response.json();
      // dispatch(setPost({ post: await response.json() }));
    } catch (error) {
      console.error("Error occured while updating like status");
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment !== "") {
      try {
        console.log(newComment);
        const response = await fetch(
          `http://lynx-social-media-app-bay.vercel.app/posts/${postId}/comments`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              userId: loggedInUserId,
              comments: `${newComment}`,
            }),
          }
        );
        if (response.ok) {
          const updatedPost = await response.json();
          dispatch(setPost({ post: updatedPost }));
          setNewComment(""); // Clear the input field after submitting the comment
        } else {
          console.error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error occurred while adding comment:", error);
      }
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://lynx-social-media-app-bay.vercel.app/assets/${picturePath}`}
          onDoubleClick={patchLike}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like Button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* addons */}
      {isComments && (
        <Box mt="0.5rem" mb="0.5rem">
          <Box
            display="flex"
            mt="0.5rem"
            mb="0.75rem"
            width="98%"
            flexBasis={isNonMobileScreens ? "26%" : undefined}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newComment !== null) {
                  handleCommentSubmit();
                }
              }}
              placeholder="Add a comment..."
              style={{
                flex: 1,
                marginRight: "0.5rem",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.75rem 2rem",
                border: `1px solid ${medium}`,
                color: main,
                fontSize: "1rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <Box m="1rem 0.5rem" />
            <SendIcon
              onClick={handleCommentSubmit}
              color="primary"
              style={{ fontSize: 45 }}
            />
          </Box>

          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Typography
                sx={{ color: main, m: "0.3rem 0", pl: "1.2rem" }}
                width="500px"
              >
                <div
                  style={{
                    maxWidth: "100%",
                    overflow: "auto",
                    wordWrap: "break-word",
                    whiteSpace: "pre-line",
                    fontSize: "105%",
                  }}
                >
                  {comment}
                </div>
              </Typography>
              <Divider />
            </Box>
          ))}
          {/* <Divider /> */}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
