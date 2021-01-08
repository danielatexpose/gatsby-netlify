import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class PetList extends React.Component {
  render() {
    const { data } = this.props
    const { edges: pets } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {pets &&
          pets.map(({ node: pet }) => (
            <div className="is-parent column is-6" key={pet.id}>
              <article className="blog-list-item tile is-child box notification">
                <header>
                  {pet.frontmatter.image ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: pet.frontmatter.image,
                          alt: `featured image thumbnail for pet ${pet.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="pet-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={pet.fields.slug}
                    >
                      {pet.frontmatter.name}
                    </Link>
                  </p>
                </header>
                <p>
                  <Link className="button" to={pet.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

PetList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PetListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-pet" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpet
                image {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PetList data={data} count={count} />}
  />
)
