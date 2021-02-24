import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";
import Semester from "../components/semester";

const Home = ({ semesters }) => {
  const publishedSemesters = semesters.map((semester) => (
    <Semester key={semester.Name} semester={semester} />
  ));
  return <div>{publishedSemesters}</div>;
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage, semesters] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
    fetchAPI("/semesters"),
  ]);
  return {
    props: { semesters },
    revalidate: 1,
  };
}

export default Home;
