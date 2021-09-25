import React from "react"
import { scale, rhythm } from "../utils/typography"
import { Link } from "gatsby"

import ShortBio from "./ShortBio"

function PostCard({ data }) {
  const { excerpt, fields, frontmatter } = data
  const { title } = frontmatter
  const { slug } = fields
  return (
    <div
      style={{
        background: "#fff",
        minWidth: 300,
        maxWidth: 350,
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
        padding: rhythm(1 / 2),
        borderRadius: rhythm(1 / 5),
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.05)",
      }}
    >
      <span
        style={{
          ...scale(-1.5 / 5),
          color: "grey",
        }}
      >
        Related Reads
      </span>
      <br />
      <Link to={slug}>
        <span
          style={{
            fontWeight: "bold",
            ...scale(2 / 5),
            color: "#000000",
          }}
        >
          {title}
        </span>
      </Link>

      <br />
      <p
        style={{
          ...scale(-1.5 / 5),
          color: "grey",
        }}
      >
        {excerpt.substring(0, 100) + "..."}
      </p>
      <br />
      <ShortBio post={data} />
    </div>
  )
}

export default PostCard
