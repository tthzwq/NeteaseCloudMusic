import PlayBar from "@/components/play-bar";
import React, { memo } from "react";

const Footer = memo(() => {
  return (
    <div className="w-full h-full col-start-1 col-end-3 ">
      <PlayBar />
    </div>
  );
});

export default Footer;
