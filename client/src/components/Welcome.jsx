import React,{useContext} from "react";
import {AiFillPlayCircle} from "react-icons/ai"
import {SiEthereum} from "react-icons/si"
import {BsInfoCircle} from "react-icons/bs"
import {Loader} from "./"
import { TransactionContext } from "../context/TransactionContext"
import { shortenAddress } from "../../utils/shortenAddress";
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
import toast, { Toaster } from 'react-hot-toast';
// const notify = () => toast('Here is your toast.');
const Input = ({
    placeholder,
    name,
    type,
    handleChange
}) => (
    <input placeholder={placeholder}
        type={type}
        name={name}
        step="0.0001"
        onChange={
            (e) => handleChange(e, name)
        }
        className="w-full border-none rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism mb-2"/>
)

const Welcome = () => {
    const {notify,currentAccount,connectWallet, handleInputChange, sendTransaction, formData,isLoading } = useContext(TransactionContext);

    const handleSubmit = () => {
       const {addressTo,amount,keyword,message} = formData;
       if(!addressTo || !amount || !keyword || !message) return;
       sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto
                        <br/>
                        across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                        {!currentAccount && (
                       <button type="button"
                        onClick={connectWallet}
                        className=" w-full flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-xl cursor-pointer hover:bg-[#2546bd]">
                        <AiFillPlayCircle className="text-white mr-2"/>
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>
     
                        )}
                    

                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={
                            `rounded-tl-2xl ${companyCommonStyles}`
                        }>
                            Reliability
                        </div>
                        <div className={companyCommonStyles}>Security</div>
                        <div className={
                            `sm:rounded-tr-2xl ${companyCommonStyles}`
                        }>
                            Ethereum
                        </div>
                        <div className={
                            `sm:rounded-bl-2xl ${companyCommonStyles}`
                        }>
                            Web 3.0
                        </div>
                        <div className={companyCommonStyles}>Low Fees</div>
                        <div className={
                            `rounded-br-2xl ${companyCommonStyles}`
                        }>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21}
                                        color="#fff"/>
                                </div>
                                <BsInfoCircle fontSize={17}
                                    color="#fff"/>
                            </div>
                            <div>

                                <p className="text-white font-semibold text-lg mt-1">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                            />
                     </div>
                    <form className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text"
                            handleChange={handleInputChange}
                            />
                        <Input placeholder="Amount (ETH)" name="amount" type="number"
                            handleChange={handleInputChange}
                            />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text"
                            handleChange={handleInputChange}/>
                        <Input placeholder="Enter Message" name="message" type="text"
                            handleChange={handleInputChange}/>

                        <div className="h-[1px] w-full bg-gray-400 my-2"/> {
                        isLoading ? <Loader/>: (
                            <button type="button"
                                onClick={handleSubmit}
                                // onClick={()=>notify('my message')}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-xl cursor-pointer">
                                Send now
                            </button>
                        )
                    } </form>
                </div>
            </div>
        </div>
    )
}


export default Welcome
