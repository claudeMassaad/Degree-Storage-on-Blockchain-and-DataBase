import { useEffect, useState } from "react";
// import Image from 'next/image'
// import ethLogo from '../assets/ethCurrency.png'
import { FiArrowUpRight } from "react-icons/fi";
import "./TransactionHistory.css";

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  // etherscanLink: `flex items-center text-[#2172e5]`,
};
// text decoration underline
const TransactionHistory = (props) => {
  //   useEffect(() => {
  //     (async () => {
  //       if (!isLoading && currentAccount) {
  //         const query = `
  //           *[_type=="users" && _id == "${currentAccount}"] {
  //             "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
  //           }
  //         `;

  //         const clientRes = await client.fetch(query);

  //         setTransactionHistory(clientRes[0].transactionList);
  //       }
  //     })();
  //   }, [isLoading, currentAccount]);

  return (
    <div className="wrapping">
      <div>
        <div className="txHistoryItem">
          <div className="txDetails">
            {/* <Image src={ethLogo} height={20} width={15} alt='eth' /> */}
            Transaction to blockchain successful{" "}
            <div>, merkle root saved to data base</div>
          </div>{" "}
          {/* <div className={style.txTimestamp}>
            {new Date(transaction.timestamp).toLocaleString("en-US", {
              timeZone: "EST",
              hour12: true,
              timeStyle: "short",
              dateStyle: "long",
            })}
          </div> */}
          <div className="etherscanLink">
            <a
              href={`https://goerli.etherscan.io/tx/${props.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="etherscanLink"
            >
              View transaction on Etherscan
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
