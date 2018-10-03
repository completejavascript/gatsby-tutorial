import React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

export default ({ data }) => {
  return (
    <Layout>
      <h1>Bài viết mới nhất</h1>
      
      {data.allMarkdownRemark.edges.map(({ node }, index) =>
        <div key={index}>
          <h3>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            <span style={{color: `#BBB`}}>— {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
