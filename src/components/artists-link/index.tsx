import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import type { ArData } from "@/lib/playerType";

interface ArtistsProps {
  list: ArData[];
}
const ArtistsLink: React.FC<ArtistsProps> = memo(({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <Fragment key={item.id}>
          <Link to={`/artist/${item.id}`}>{item.name}</Link>
          {index !== list.length - 1 && <span className="px-1">/</span>}
        </Fragment>
      ))}
    </>
  );
});

export default ArtistsLink;
