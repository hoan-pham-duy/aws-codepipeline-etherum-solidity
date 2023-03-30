// import process from 'process';

import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import LhMemories from '../artifacts/contracts/LhMemories.sol/LhMemories.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDR;
console.log('contractAddress = ', contractAddress);
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
// get the smart contract
const contract = new ethers.Contract(contractAddress, LhMemories.abi, signer);

function LhMemoriesComp() {
  const [post, setPost] = useState('');
  const [ownerMemories, setOwnerMemories] = useState([]);
  useEffect(() => {
    getOwnerPosts();
  }, []);

  const getOwnerPosts= async () => {
    const posts = await contract.getPostsSpecificAddr();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>Owner LH Memories</h1>
      <div className="container">
        <div className="row">
            <h3> Owner Memories Here </h3>
{/* 
            {
            ownerMemories.map(function (memory){
            <h5>memory</h5>
            })
            }
             */}
        </div>
      </div>
    </div>
  );
}


export default LhMemoriesComp;
