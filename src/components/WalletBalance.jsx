import { useState } from 'react';
import { ethers } from 'ethers';

import '../index.css'
import './WalletBalance.css'


function WalletBalance() {

    const [balance, setBalance] = useState();
    const [walletAddress, setWalletAddress] = useState('')
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
        
        setWalletAddress(account);
    };
  
    return (
      <div className="card">
        <div className="card-body">
          <button className="btn btn-navy" onClick={() => getBalance()}>Connect your Wallet</button>
          <h6 className="card-title">Your Wallet Address: {walletAddress}</h6>
          <h6 className="card-title">Your Balance: {balance}</h6>
        </div>
      </div>
    );
  };
  
  export default WalletBalance;