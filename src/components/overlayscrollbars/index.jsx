import { useOverlayScrollbars } from "./useOverlayScrollbars";
import "overlayscrollbars/overlayscrollbars.css";

import React, { memo, useRef, useEffect } from "react";

const OverlayScrollbarsComponent = memo(({ children }) => {
  const ref = useRef();
  const [initialize, instance] = useOverlayScrollbars();

  useEffect(() => {
    initialize(ref.current);
  }, [initialize]);

  return <div className="w-full" ref={ref}>{children}</div>;
});

export default OverlayScrollbarsComponent;
