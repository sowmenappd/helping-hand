import React, { useEffect } from "react";
import { HStack, VStack, Heading, Button, Box } from "@chakra-ui/react";

import HelpPost from "./HelpPost";
import SearchSkeleton from "./SearchSkeleton";
import { POST_TYPE, usePostsContext } from "../store/posts";
import { POST_ACTIONS } from "../store/types";
import NotFoundNotice from "./NotFoundNotice";

import PostController from "../controller/posts";
import { useAuthContext } from "../store/auth";

const HelpPostListings: React.FC = (props) => {
  const [authState] = useAuthContext();
  const [state, dispatch] = usePostsContext();
  const { posts } = state;

  const { data, loading, error } = posts;

  useEffect(() => {
    fetchPosts(state.currentPostsType);
  }, [state.currentPostsType]);

  const fetchPosts = async (type: "help" | "social") => {
    dispatch({
      type: POST_ACTIONS.FETCH_POSTS,
      payload: { type },
    });

    try {
      const { data } = await PostController.fetchPosts(type, authState.token);
      console.log(data);
      dispatch({
        type: POST_ACTIONS.FETCH_POSTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack maxW={"6xl"} alignItems="flex-start">
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
        Right now
      </Heading>
      <PostTypeSelector
        type={state.currentPostsType}
        dispatch={(type: string) =>
          dispatch({
            type: POST_ACTIONS.TOGGLE_TYPE,
            payload: type,
          })
        }
      />
      <Box w={["100%", "xl", "xl", "2xl", "4xl"]}>
        {loading ? (
          <SearchSkeleton loading={true} />
        ) : error ? (
          <NotFoundNotice />
        ) : (
          data &&
          data.map(
            ({ id, author, title, datetimeISO, description, tags }: any) => {
              return (
                <HelpPost
                  key={id}
                  id={id}
                  author={author}
                  title={title}
                  description={description}
                  tags={tags}
                  datetimeISO={datetimeISO}
                />
              );
            }
          )
        )}
      </Box>
    </VStack>
  );
};

export const PostTypeSelector: React.FC<{ type: string; dispatch: any }> = ({
  type,
  dispatch,
}) => (
  <HStack pl="8" pt="4">
    <Button
      rounded="3xl"
      color={type == POST_TYPE.HELP ? "green.600" : ""}
      bg={type == POST_TYPE.HELP ? "green.50" : ""}
      onClick={() => dispatch(POST_TYPE.HELP)}
    >
      Help
    </Button>
    <Button
      rounded="3xl"
      color={type == POST_TYPE.SOCIAL ? "green.600" : ""}
      bg={type == POST_TYPE.SOCIAL ? "green.50" : ""}
      onClick={() => dispatch(POST_TYPE.SOCIAL)}
    >
      Social
    </Button>
  </HStack>
);

export default HelpPostListings;
