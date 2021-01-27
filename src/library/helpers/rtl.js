import React from "react";

let direction = "ltr"; //對於多國語系語言從「左到右」
if (typeof window !== "undefined") {
  direction = document.getElementsByTagName("html")[0].getAttribute("dir");
}
const withDirection = Component => props => {
  return <Component {...props} data-rtl={direction} />;
};

export default withDirection;
export { direction };
