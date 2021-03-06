import React, { useEffect, useState } from "react";
import { HStack, VStack, Heading, Button, Box } from "@chakra-ui/react";

import HelpPost from "./HelpPost";
import SearchSkeleton from "./SearchSkeleton";
import { fetchPosts, POST_TYPE, usePostsContext } from "../store/posts";
import { POST_ACTIONS } from "../store/types";
import NotFoundNotice from "./NotFoundNotice";

import { useAuthContext } from "../store/auth";
import GraphicNotice from "./GraphicNotice";
import empty from "../images/empty.svg";
import DeletePostAlert from "./DeletePostAlert";

const HelpPostListings: React.FC = (props) => {
  const [authState] = useAuthContext();
  const [state, dispatch] = usePostsContext();
  const { posts } = state;

  const { data, loading, error } = posts;

  const [showDeleteNotice, setShowDeleteNotice] = useState(false);

  useEffect(() => {
    fetchPosts(
      state.currentPostsType,
      authState.username,
      dispatch,
      authState.token
    );
  }, [state.currentPostsType]);

  return (
    <VStack w={["full", "full", "full", "2xl", "4xl"]} alignItems="flex-start">
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
        ) : data && data.length > 0 ? (
          data.map(
            ({
              id,
              username,
              author,
              title,
              datetimeISO,
              description,
              tags,
              friends,
            }: any) => {
              return (
                <HelpPost
                  key={id}
                  id={id}
                  author={author}
                  username={username}
                  title={title}
                  description={description}
                  tags={tags}
                  datetimeISO={datetimeISO}
                  hidden={username === authState.username ? false : !friends}
                  onDelete={null}
                />
              );
            }
          )
        ) : (
          <GraphicNotice
            title="No posts available."
            subtitle="Make your first post!"
            img={empty}
          />
        )}
      </Box>
      <DeletePostAlert />
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
