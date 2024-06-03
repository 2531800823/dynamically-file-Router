import React, { FC } from "react";

interface Test1Props {}

const Test1: FC<Test1Props> = (props) => {
  const {} = props;
  console.log("test1");
  return <div>test1</div>;
};

export default Test1;
