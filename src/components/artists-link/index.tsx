import React, { memo } from 'react'
import { Link } from "react-router-dom";
import type { ArData } from "@/lib/playerType"

interface ArtistsProps {
  list: ArData[];
}
const ArtistsLink: React.FC<ArtistsProps> = memo(({ list }) => {
  return (
    <ul className="inline-flex">
      {list.map((item, index) => (
        <li key={item.id}>
          <Link to={`/artist/${item.id}`}>{item.name}</Link>
          {index !== list.length - 1 ? " / " : ""}
        </li>
      ))}
    </ul>
  )
})

export default ArtistsLink