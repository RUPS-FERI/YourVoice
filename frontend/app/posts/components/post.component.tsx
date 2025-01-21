import { Avatar, Card, CardBody } from "@heroui/react";
import { CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Chip } from "@heroui/chip";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Badge } from "@heroui/badge";

import {
  aljaz,
  Comment,
  Post,
  PostService,
} from "@/app/_common/services/posts.service";

function CommentsSvg() {
  return (
    <svg
      fill="none"
      height="800px"
      viewBox="0 0 24 24"
      width="800px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.24999 17.31C4.12892 17.3121 4.00915 17.2849 3.9009 17.2306C3.79266 17.1763 3.69916 17.0966 3.62841 16.9984C3.55766 16.9001 3.51175 16.7862 3.49461 16.6663C3.47747 16.5464 3.48961 16.4242 3.52999 16.31L4.77999 12.19C4.52436 11.4877 4.38913 10.7473 4.37999 10C4.37802 9.13743 4.55154 8.28345 4.88999 7.49003C5.30028 6.51286 5.94398 5.65124 6.76468 4.98069C7.58537 4.31013 8.55801 3.85109 9.59735 3.64382C10.6367 3.43654 11.711 3.48735 12.7261 3.79179C13.7413 4.09623 14.6662 4.64501 15.42 5.39003C16.0049 5.98425 16.473 6.68303 16.8 7.45003C17.1322 8.24163 17.3033 9.09152 17.3033 9.95003C17.3033 10.8085 17.1322 11.6584 16.8 12.45C16.473 13.217 16.0049 13.9158 15.42 14.51C14.5431 15.3854 13.4337 15.9909 12.2231 16.255C11.0126 16.5191 9.75176 16.4306 8.58999 16L4.46999 17.28C4.39833 17.2998 4.32434 17.3099 4.24999 17.31ZM10.84 5.00003C10.1769 4.9981 9.52031 5.13078 8.90999 5.39003C7.72766 5.88899 6.78244 6.82347 6.26999 8.00003C6.01284 8.61273 5.88039 9.27055 5.88039 9.93503C5.88039 10.5995 6.01284 11.2573 6.26999 11.87C6.32957 12.0348 6.32957 12.2152 6.26999 12.38L5.34999 15.38L8.34999 14.46C8.51477 14.4005 8.69521 14.4005 8.85999 14.46C10.0743 14.9643 11.4383 14.97 12.6567 14.4759C13.8752 13.9818 14.85 13.0276 15.37 11.82C15.6626 11.072 15.7707 10.2646 15.6852 9.46592C15.5996 8.6673 15.323 7.90103 14.8786 7.23198C14.4342 6.56293 13.8351 6.01078 13.1321 5.62227C12.4292 5.23376 11.6429 5.02033 10.84 5.00003Z"
        fill="#000000"
      />
      <path
        d="M19.75 20.5C19.677 20.5098 19.603 20.5098 19.53 20.5L15.41 19.25C13.8622 19.8345 12.1485 19.7988 10.6263 19.1504C9.10411 18.502 7.89101 17.291 7.24001 15.77C7.19551 15.68 7.17006 15.5818 7.16524 15.4815C7.16042 15.3812 7.17634 15.281 7.21201 15.1872C7.24767 15.0933 7.30231 15.0078 7.37251 14.936C7.44272 14.8643 7.52697 14.8077 7.62001 14.77C7.71049 14.7284 7.80834 14.7052 7.90786 14.7019C8.00739 14.6985 8.10658 14.715 8.19967 14.7504C8.29276 14.7857 8.37786 14.8393 8.45003 14.9079C8.5222 14.9765 8.57998 15.0588 8.62001 15.15C8.8577 15.7165 9.19656 16.2349 9.62001 16.68C10.3212 17.3735 11.2117 17.8441 12.1797 18.0327C13.1477 18.2213 14.1498 18.1195 15.06 17.74C15.2248 17.6804 15.4052 17.6804 15.57 17.74L18.57 18.66L17.65 15.66C17.5904 15.4952 17.5904 15.3148 17.65 15.15C17.9093 14.5397 18.0419 13.8831 18.04 13.22C18.0424 12.5681 17.9154 11.9223 17.6665 11.3198C17.4177 10.7173 17.0518 10.1701 16.59 9.71C16.3877 9.45434 16.1635 9.21678 15.92 9C15.8326 8.94754 15.7568 8.8778 15.6972 8.79505C15.6376 8.7123 15.5955 8.61827 15.5735 8.51871C15.5515 8.41915 15.5501 8.31614 15.5692 8.21599C15.5884 8.11585 15.6277 8.02065 15.6849 7.93624C15.7421 7.85182 15.8159 7.77995 15.9018 7.72502C15.9877 7.67009 16.0839 7.63325 16.1845 7.61675C16.2852 7.60026 16.3881 7.60445 16.487 7.62908C16.586 7.65371 16.6789 7.69826 16.76 7.76C17.1177 7.99091 17.4526 8.25544 17.76 8.55C18.3481 9.14159 18.8167 9.84102 19.14 10.61C19.4793 11.4067 19.6528 12.2641 19.65 13.13C19.6479 13.8975 19.5126 14.6588 19.25 15.38L20.5 19.5C20.5404 19.6142 20.5525 19.7364 20.5354 19.8563C20.5183 19.9761 20.4723 20.0901 20.4016 20.1883C20.3308 20.2866 20.2373 20.3663 20.1291 20.4206C20.0209 20.4748 19.9011 20.5021 19.78 20.5H19.75Z"
        fill="#000000"
      />
    </svg>
  );
}

function UpVoteSvg() {
  return (
    <svg
      fill="#000000"
      height="250px"
      viewBox="0 0 24 24"
      width="250px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
    </svg>
  );
}

function DownVoteSvg() {
  return (
    <svg
      fill="#000000"
      height="250px"
      viewBox="0 0 24 24"
      width="250px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
    </svg>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [upvoted, setUpvoted] = useState(comment.votes[0]);
  const [downvoted, setDownvoted] = useState(comment.votes[1]);
  const [comments, setComments] = useState(comment.comments);
  const [reply, setReply] = useState<null | string>(null);

  function addComment() {
    if (reply === null) return;
    const newComment: Comment = {
      user: aljaz,
      id: Math.floor(Math.random() * 1000) + 500,
      votes: [[], []],
      comments: [],
      content: reply,
    };

    setReply("");
    setComments([...comments, newComment]);
  }

  function upvote() {
    if (comment.votes[0].includes(0)) {
      const upvotes = comment.votes[0].filter((vote) => vote != 0);

      comment.votes[0] = upvotes;
    } else if (comment.votes[1].includes(0)) {
      const downvotes = comment.votes[1].filter((vote) => vote != 0);

      comment.votes[1] = downvotes;
      comment.votes[0].push(0);
    } else {
      comment.votes[0].push(0);
    }

    setUpvoted([...comment.votes[0]]);
    setDownvoted([...comment.votes[1]]);
  }

  function downvote() {
    if (comment.votes[1].includes(0)) {
      const downvotes = comment.votes[1].filter((vote) => vote != 0);

      comment.votes[1] = downvotes;
    } else if (comment.votes[0].includes(0)) {
      const upvotes = comment.votes[0].filter((vote) => vote != 0);

      comment.votes[0] = upvotes;
      comment.votes[1].push(0);
    } else {
      comment.votes[1].push(0);
    }
    setUpvoted([...comment.votes[0]]);
    setDownvoted([...comment.votes[1]]);
  }

  const [showReplies, setShowReplies] = useState(false);

  return (
    <div
      style={{ marginBottom: "10px", paddingLeft: "15px", marginTop: "10px" }}
    >
      <CardHeader className={"flex align-center justify-between"}>
        <div className={"flex justify-items-center align-middle"}>
          <Avatar className={"mr-3"} name={comment.user.name} />
          <span>{comment.user.name}</span>
        </div>
      </CardHeader>
      <CardBody>
        {comment.content}
        {comment.image !== null && (
          <Image
            alt="post image"
            src={comment.image}
            style={{ width: "60%" }}
          />
        )}
      </CardBody>
      <CardFooter>
        <Button
          className={"mr-3 p-0 flex justify-between"}
          color={comment.votes[0].includes(0) ? "primary" : "default"}
          onClick={upvote}
        >
          <UpVoteSvg />
          <span className="mr-3" style={{ fontSize: "1.1rem" }}>
            {upvoted.length}
          </span>
        </Button>
        <Button
          className={"mr-3 p-0 flex justify-between"}
          color={downvoted.includes(0) ? "primary" : "default"}
          onClick={downvote}
        >
          <DownVoteSvg />

          <span className="mr-3" style={{ fontSize: "1.1rem" }}>
            {comment.votes[1].length}
          </span>
        </Button>
        {comments.length > 0 && (
          <Button
            className={"mr-3 p-0 flex justify-between"}
            color={showReplies ? "primary" : "default"}
            onClick={() => setShowReplies(!showReplies)}
          >
            <CommentsSvg />

            <span className="mr-3" style={{ fontSize: "1.1rem" }}>
              {comments.length}
            </span>
          </Button>
        )}
        <Button>Follow</Button>
      </CardFooter>
      <div className={"flex align-middle"}>
        <Input
          label="Reply"
          name="Reply"
          placeholder="Replay to this post"
          type="text"
          value={reply ?? ""}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button onClick={addComment}>Reply</Button>
      </div>
      {showReplies && comments.length > 0 && (
        <div style={{ paddingLeft: "20px" }}>
          {comments
            .sort((a, b) => {
              return (
                b.votes[0].length -
                b.votes[1].length -
                (a.votes[0].length - a.votes[1].length)
              );
            })
            .map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
      )}
      <Divider />
    </div>
  );
}

export default function PostCard(props: { post: Post }) {
  const [upvoted, setUpvoted] = useState(props.post.votes[0]);
  const [downvoted, setDownvoted] = useState(props.post.votes[1]);
  const [comments, setComments] = useState(props.post.comments);
  const [reply, setReply] = useState<null | string>(null);
  const [showReplies, setShowReplies] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  function addComment() {
    if (reply === null) return;
    const newComment: Comment = {
      user: aljaz,
      id: Math.floor(Math.random() * 1000) + 500,
      votes: [[], []],
      comments: [],
      content: reply,
    };

    setReply("");
    setComments([...comments, newComment]);
    if (isFollowing) {
      setShowBanner(true);
    }
  }

  function upvote() {
    if (props.post.votes[0].includes(0)) {
      const upvotes = props.post.votes[0].filter((vote) => vote != 0);

      props.post.votes[0] = upvotes;
    } else if (props.post.votes[1].includes(0)) {
      const downvotes = props.post.votes[1].filter((vote) => vote != 0);

      props.post.votes[1] = downvotes;
      props.post.votes[0].push(0);
    } else {
      props.post.votes[0].push(0);
    }
    PostService.get.update(props.post);
    setUpvoted([...props.post.votes[0]]);
    setDownvoted([...props.post.votes[1]]);
  }

  function downvote() {
    if (props.post.votes[1].includes(0)) {
      const downvotes = props.post.votes[1].filter((vote) => vote != 0);

      props.post.votes[1] = downvotes;
    } else if (props.post.votes[0].includes(0)) {
      const upvotes = props.post.votes[0].filter((vote) => vote != 0);

      props.post.votes[0] = upvotes;
      props.post.votes[1].push(0);
    } else {
      props.post.votes[1].push(0);
    }
    PostService.get.update(props.post);
    setUpvoted([...props.post.votes[0]]);
    setDownvoted([...props.post.votes[1]]);
  }

  return (
    <Card style={{ marginBottom: "15px" }}>
      <CardHeader className="flex justify-between">
        {showBanner && (
          <Badge color={"danger"} content={1} placement={"top-left"}>
            <div className={"flex justify-items-center align-middle"}>
              <Avatar className={"mr-3"} name={props.post.user.name} />
              <h2 className={"text-2xl"}>{props.post.title}</h2>
            </div>
          </Badge>
        )}
        {!showBanner && (
          <div className={"flex justify-items-center align-middle"}>
            <Avatar className={"mr-3"} name={props.post.user.name} />
            <h2 className={"text-2xl"}>{props.post.title}</h2>
          </div>
        )}

        <div className={"flex justify-between"}>
          <div className={"mr-2"}>
            {props.post.category.map((category) => (
              <Chip key={category} className={"ml-2"} color={"success"}>
                {category}
              </Chip>
            ))}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {props.post.content}
        {props.post.image !== null && (
          <Image
            alt="post image"
            src={props.post.image}
            style={{ width: "60%" }}
          />
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-start">
        <Button
          className={"mr-3 p-0 flex justify-between"}
          color={props.post.votes[0].includes(0) ? "primary" : "default"}
          onClick={upvote}
        >
          <UpVoteSvg />
          <span className="mr-3" style={{ fontSize: "1.1rem" }}>
            {upvoted.length}
          </span>
        </Button>
        <Button
          className={"mr-3 p-0 flex justify-between"}
          color={downvoted.includes(0) ? "primary" : "default"}
          onClick={downvote}
        >
          <DownVoteSvg />

          <span className="mr-3" style={{ fontSize: "1.1rem" }}>
            {props.post.votes[1].length}
          </span>
        </Button>
        {comments.length > 0 && (
          <Button
            className={"mr-3 p-0 flex justify-between"}
            color={showReplies ? "primary" : "default"}
            onClick={() => {
              setShowReplies(!showReplies);
              setShowBanner(false);
            }}
          >
            <CommentsSvg />

            <span className="mr-3" style={{ fontSize: "1.1rem" }}>
              {comments.length}
            </span>
          </Button>
        )}
        <Button onClick={() => setIsFollowing(!isFollowing)}>
          {isFollowing ? "Stop Following" : "Follow"}
        </Button>
      </CardFooter>
      <div className={"flex align-middle"}>
        <Input
          label="Reply"
          name="Reply"
          placeholder="Replay to this post"
          type="text"
          value={reply ?? ""}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button onClick={addComment}>Reply</Button>
      </div>

      {showReplies &&
        comments
          .sort((a, b) => {
            return (
              b.votes[0].length -
              b.votes[1].length -
              (a.votes[0].length - a.votes[1].length)
            );
          })
          .map((comment) => (
            <div key={comment.id} style={{ paddingLeft: "20px" }}>
              <CommentItem comment={comment} />
            </div>
          ))}
    </Card>
  );
}
