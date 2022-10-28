import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners";
import "./TransactionLoader.css";

const style = {
  wrapper: `text-white h-200 w-72 flex flex-row justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
};

const cssOverride = css`
  display: block;
  margin: 0 2px;
  border-color: white;
`;

const TransactionLoader = (props) => {
  return (
    <div className="wrapper">
      <div className="wrapper - title">
        {props.generated
          ? "Generating Transaction on blockchain and saving to data base..."
          : "Getting Merkle Tree and Root..."}
      </div>
      <MoonLoader color={"#fff"} loading={true} css="moonCss" size={50} />
    </div>
  );
};

export default TransactionLoader;
