import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import HelpPostListings from "../components/HelpPostListings";
import HelpPostSearchResults from "../components/HelpPostSearchResults";
import PostHelpSection from "../components/PostHelpSection";
import SearchBar from "../components/SearchBar";
import { useAuthContext } from "../store/auth";
import { usePostsContext, searchPosts } from "../store/posts";

const AllPostsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const [{ posts }, dispatch] = usePostsContext();
  const [{ token }] = useAuthContext();

  useEffect(() => {
    searchPosts(searchText, dispatch, token);
  }, [searchText]);

  return (
    <>
      <SearchBar
        searchText={searchText}
        onSearch={(text: string) => {
          setSearchText(text);
        }}
      />
      {searchText?.length > 3 ? (
        <HelpPostSearchResults
          loading={posts.loading}
          results={posts.data}
          searchText={searchText}
        />
      ) : (
        <>
          <PostHelpSection />
          <HelpPostListings />
        </>
      )}
    </>
  );
};

export default AllPostsPage;
