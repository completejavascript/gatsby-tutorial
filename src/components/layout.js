import React from "react";
import "./layout.css";
import Menu from "./menu";
import Sidebar from "./sidebar";
import { StaticQuery, graphql } from "gatsby";

export default props => {
  const { children } = props;

  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        },
        topics: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                categories
                tags
              }
            }
          }
        }
      }
    `}
      render={data => (
        <div className="app">
          <Menu title={data.site.siteMetadata.title} />
          <div className="main">
            <div className="content">{children}</div>
            <div className="sidebar">
              <Sidebar      
                edges={data.topics.edges}
              />
            </div>
          </div>
        </div>
      )}
    />
  )
}