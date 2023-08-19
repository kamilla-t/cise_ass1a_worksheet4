import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";

interface ArticlesInterface {
  title: string;
  authors: string;
  source: string;
  publicationYear: number;
  DOI: string;
  summary: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
    const headers: { key: keyof ArticlesInterface; label: string }[] = [
      { key: "title", label: "Title" },
      { key: "authors", label: "Authors" },
      { key: "source", label: "Source" },
      { key: "publicationYear", label: "Publication Year" },
      { key: "DOI", label: "DOI" },
      { key: "summary", label: "Claim" }
    ];
  
    return (
      <div className="container">
        <h1>Articles Index Page</h1>
        <p>Page containing a table of articles:</p>
        <SortableTable headers={headers} data={articles} />
      </div>
    );
  };
  
  export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
    
    const articleResponse = await axios.get("http://localhost:3000/articles");

    // Map the data to ensure all articles have consistent property names
    const articles: any[] = articleResponse.data;
    return {
      props: {
        articles,
      },
    };
  };
  
  export default Articles;
  