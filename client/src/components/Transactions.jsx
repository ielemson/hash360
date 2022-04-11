import React, {useContext} from "react";
import {TransactionContext} from "../context/TransactionContext"
// import dummyData from "../../utils/dummyData";
import {shortenAddress} from "../../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

  const TransactionCard = ({
      addressTo,
      amount,
      url,
      addressFrom,
      message,
      timestamp,
      keyword
  }) => {
      const gifUrl = useFetch({keyword})
      return (
   

      <div className="rounded-lg shadow-lg bg-[#181918] overflow-hidden relative w-full md:w-60 lg:my-4 lg:px-0 lg:w-96">
      <div>
        <img className="w-full h-60" src={gifUrl || url} alt="gifs"/>
      </div>
      <div className="p-4">
        <h2 className="text-2xl text-green-400"> Sent : {amount} ETH</h2>
        <div className="flex justify-between mt-4 mb-4 text-gray-100">
          <div className="flex items-center">
            <a href={`https://ropsten.etherscan.io/address/${addressFrom}` } className=" lg:text-lg cursor-pointer"  target="_blank" rel="noopener noreferrer">  From: { shortenAddress(addressFrom) } </a>
        </div>
         
          <div className="flex items-center">
          
            <a href={`https://ropsten.etherscan.io/address/${addressTo}`} className="ml-1 lg:text-lg cursor-pointer" target="_blank" rel="noopener noreferrer"> To: {shortenAddress(addressTo)} </a>
          </div>
        </div>
        <p className="mb-4 text-gray-100">
        {message && (
      
         <>
         Message : <i>{message}</i>
         </>
      )}
        </p>
      </div>
      <div className="absolute top-0 right-0 mt-4 mr-4 bg-gray-600 text-white rounded-2xl pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
        <span>{timestamp}</span>
      </div>
    </div>
      )
  }

const Transactions = () => {
    const {currentAccount,transactions,isLoading} = useContext(TransactionContext);

    return (
    <>
    
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4"> {
            currentAccount ? (<h1 className="text-white text-3xl text-center my-2 capitalize">
                Latest Transactions
            </h1>) : 
            (
          
            <div className="flex bg-blue-100 rounded-lg p-4 mb-4  text-blue-700 text-xl text-center my-2 capitalize" role="alert">
              <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            <div>
            Connect your account to see latest changes
        </div>
    </div>
            )
        }

        <div className="h-full gradient-bg-transactions">

        <div className="container mx-auto p-4">

          <div className="grid gap-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {
          transactions.reverse().map((transaction, i) => (<TransactionCard key={i}
            {...transaction}/>))
        } 
          
          </div>
        </div>
        </div>

            </div>
        </div>
          
        </>
 
    )
}

export default Transactions
