import { useState } from 'react';
import { ethers } from 'ethers';

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
          <h5 className="card-title">Your Wallet Address: {walletAddress}</h5>
          <h5 className="card-title">Your Balance: {balance}</h5>
          <button className="btn btn-success" onClick={() => getBalance()}>Show My Balance</button>
        </div>
      </div>
    );
  };
  
  export default WalletBalance;