import React from "react";
import HeadLine from "../components/HeadLine";

const HeadLineFullPage = ({ title, secondary }) => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div className=" -translate-y-1/4 transform">
        <HeadLine title={title} secondary={secondary} />
        <h1 className="text-lg hover:underline"> Hello</h1>
      </div>
    </div>
  );
};

export default HeadLineFullPage;
