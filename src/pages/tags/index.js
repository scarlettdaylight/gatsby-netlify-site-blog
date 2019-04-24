import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import CustomLink from '../../components/Atoms/CustomLink';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <section className="section">
    <Helmet title={`Tags | ${title}`} />
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1" style={{ marginBottom: '6rem' }}>
          <h1 className="title is-size-2 is-bold-light">Tags</h1>
          <ul className="taglist">
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <CustomLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        meta {
          title
        }
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
