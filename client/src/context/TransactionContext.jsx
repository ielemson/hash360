import React, {useEffect, useState} from "react";
import {ethers} from "ethers"
import {contractAddress, contractAbi} from "../../utils/constant"
import toast, { Toaster } from 'react-hot-toast';
const notify = (msg) => toast.success(`${msg}`,{ duration:5000,});
// create the react context for this file
export const TransactionContext = React.createContext();

// get ethereum object from window with the aid of the metmask plugin
const {ethereum} = window;

// fetch the ethereum contract
const getEthereumContract = () => { // get the ether provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    // console.log({provider, signer, transactionContract});
    return transactionContract;

}


export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData,setformData] = useState({addressTo:'', amount:'', keyword:'', message:''});
    const [isLoading, setisLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState([]);
        // handle input function
        const handleInputChange = (e,name) => {
            setformData((prevState)=>({...prevState,[name]:e.target.value}));
        }

        const getAllTransactions=async()=>{
            try{
                if (!ethereum) return alert('Please install metamask');
                const transactionContract =  getEthereumContract()
                const availableTransactions = await transactionContract.getAllTransactions();

                
                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                setTransactions(structuredTransactions);

                // console.log(structuredTransactions)
            }catch(error){
                console.log(error)
                throw new Error("no ethereum object")
            }

        }
        // async function to check if wallet is connect
        const checkIfWalletIsConnected = async () => {

        try{
        // check if ethereum obj. exist. this is provied by metamask
        if (!ethereum) return alert('Please install metamask');

        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts);

        if(accounts.length){
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        }else{
            console.info("No account found");
        }
        }catch(error){
            console.log(error)
            throw new Error("no ethereum object")
        }


        }

        const checkIfTransactionExist = async()=>{
            const transactionContract =  getEthereumContract()
            const currentTransactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount',currentTransactionCount)
            try{

            }catch(error){
                console.error(error)
                throw new error('no ethereum object');
            }
        }

        //async function to connect wallet on button click
        const connectWallet = async()=> {

        try{
        if (!ethereum) return alert('Please install metamask');
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setCurrentAccount(accounts[0])
        }catch(error){
            console.log(error)
            throw new Error("no ethereum object")
        }
        }

        // async function to send transations
        const sendTransaction = async() => {
            const {addressTo,amount,keyword,message} = formData;
            const parsedAmount = ethers.utils.parseEther(amount)
            // console.log(formData)
           const transactionContract =  getEthereumContract()
                try {
                    if(!ethereum) return alert('Please install metamask');
                    await ethereum.request({
                        method:'eth_sendTransaction',
                        params:[{
                            from:currentAccount,
                            to:addressTo,
                            gas:'0x5208' ,   //values in eth are written in hexadecimal :21000 GWEI
                            value:parsedAmount._hex //0.001

                        }]
                    });
                       //store transaction in the blockchain
                const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
                setisLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();

                setisLoading(false);
                // console.log(`Success - ${transactionHash.hash}`);
                notify("Your Crypto has been sent!")
                const transactionsCount = await transactionContract.getTransactionCount();
                setTransactionCount(transactionsCount.toNumber())
                
                } catch (error) {
                    console.error(error)
                    throw new error('No ethereum object');
                }
        }

                useEffect(() => {
                checkIfWalletIsConnected();
                checkIfTransactionExist()
                }, [transactionCount])

    return (<TransactionContext.Provider value={{notify,currentAccount,connectWallet, handleInputChange, formData, sendTransaction,transactions,isLoading}}> {children} </TransactionContext.Provider>)
}
