import { useEffect, useRef } from "react";

const Protected = () => {
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
  }, []);

  return <div>Protected</div>;
};

export default Protected;
