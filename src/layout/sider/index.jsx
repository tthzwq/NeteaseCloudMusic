import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Sider = memo(() => {
  return (
    <div className="pt-[50px] bg-[#ededed]">
      <ul>
        <li>
          <NavLink to="/discovery">发现音乐</NavLink>
        </li>
        <li>
          <NavLink to="/my">我喜欢的音乐</NavLink>
        </li>
      </ul>
    </div>
  );
});

export default Sider;
