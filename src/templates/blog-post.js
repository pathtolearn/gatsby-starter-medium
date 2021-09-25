import React from "react"
import { graphql } from "gatsby"
import Disqus from "disqus-react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import RecentPosts from "../components/RecentPosts"
import ShortBio from "../components/ShortBio"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { title, disqusShortname } = this.props.data.site.siteMetadata
    const maxWidth = rhythm(27)
    return (
      <Layout location={this.props.location} title={title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: rhythm(1),
            paddingRight: rhythm(1),
          }}
        >
          <div style={{ maxWidth: maxWidth }}>
            <h1
              style={{
                ...scale(6 / 5),
              }}
            >
              {post.frontmatter.title}
            </h1>
            <ShortBio post={post} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <Bio />
          </div>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "#fafafa",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: rhythm(1.5),
          }}
        >
          <RecentPosts />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              maxWidth: maxWidth,
            }}
          >
            <p
              style={{
                ...scale(-1 / 5),
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Responses
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: rhythm(1),
                border: "1px solid #E3E3E3",
                borderRadius: rhythm(1 / 5),
              }}
            >
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={{
                  url: this.props.location.href,
                  identifier: this.props.location.pathname,
                  title: post.frontmatter.title,
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
