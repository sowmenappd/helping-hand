import React, { useEffect, useState } from "react";
import { VStack, Box, Heading, Button, Link } from "@chakra-ui/react";
import GraphicNotice from "../components/GraphicNotice";
import { useAuthContext } from "../store/auth";
import svg from "../images/no_messages.svg";

import db from "../controller/db";
import { makeAuthConfigWithToken } from "../controller/misc";
import MessageCard from "../components/MessageCard";
import { usePostsContext, viewPost } from "../store/posts";
import { useHistory } from "react-router-dom";

const MessagesPage = () => {
  const [{ username, token }] = useAuthContext();
  const [_, dispatch] = usePostsContext();

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const config = makeAuthConfigWithToken(token);

      setLoading(true);

      const queryGetPostIds = `SELECT DISTINCT postId FROM ${process.env.NODE_ENV}.post_messages WHERE owner = "${username}" or replyTo = "${username}"`;
      const { data: postIds } = await db.executeSQLQuery(
        queryGetPostIds,
        config
      );

      const postsString = postIds
        .map(({ postId }: any) => `"${postId}"`)
        .toString();
      console.log(postsString);
      const queryGetPosts = `SELECT * FROM ${process.env.NODE_ENV}.posts WHERE id IN (${postsString})`;

      const { data: posts } = await db.executeSQLQuery(queryGetPosts, config);
      setPosts(posts.length > 0 ? posts : []);
      setLoading(false);

      console.log("posts", posts);
    })();
  }, []);

  const handleViewPost = (id: string) => {
    const post = posts.find((p: any) => p.id === id) as any;

    viewPost(
      post,
      post.username === username ? null : username,
      dispatch,
      token
    );
    history.push(`/home/post/${id}`);
  };

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box w={["full", "full", "full", "2xl", "4xl"]}>
        <Heading as="h1" fontSize={["4xl", "6xl"]}>
          <span
            style={{
              color: "#272727",
              opacity: 0.15,
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            <b>#</b>
          </span>
          Messages
        </Heading>
        <VStack
          mt={5}
          mx={4}
          maxH="fit-content"
          align="flex-start"
          borderRadius="xl"
          overflow="clip"
        >
          {!loading && posts.length == 0 && (
            <GraphicNotice
              title="No messages here"
              subtitle="We've sent Snoopy to investigate and find out why."
              img={svg}
              bg="gray.100"
            >
              <Link to="/home">
                <Button
                  children="Go back"
                  variant="link"
                  fontSize="xl"
                  fontWeight="normal"
                  colorScheme="facebook"
                  mb={6}
                />
              </Link>
            </GraphicNotice>
          )}
          {!loading &&
            posts.map(
              (post: {
                id: string;
                datetimeISO: string;
                title: string;
                description: string;
                username: string;
              }) => {
                return (
                  <Box
                    w="full"
                    h="fit-content"
                    bg="gray.100"
                    p={6}
                    pl={[4, 6]}
                    key={post.id}
                  >
                    <MessageCard
                      id={post.id}
                      datetimeISO={post.datetimeISO}
                      title={post.title}
                      description={post.description}
                      username={post.username}
                      onViewPost={(id) => {
                        console.log(`navigate to post ${id}`);
                        handleViewPost(id);
                      }}
                    />
                  </Box>
                );
              }
            )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default MessagesPage;
