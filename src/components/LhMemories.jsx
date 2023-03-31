// import process from 'process';

import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers, utils } from 'ethers';
// import web3_eth_abi from "web3-eth-abi";
import LhMemories from '../artifacts/contracts/LhMemories.sol/LhMemories.json';

const contractAddress = import.meta.env.VITE_LH_MEMORIES_CONTRACT_ADDR;
console.log('LH Memories contractAddress = ', contractAddress);
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
// console.log("Account:", await signer.getAddress());
// get the smart contract
const contract = new ethers.Contract(contractAddress, LhMemories.abi, signer);

function LhMemoriesComp() {
  const [post, setPost] = useState('');
  const [ownerMemories, setOwnerMemories] = useState([]);
  useEffect(() => {
    getOwnerPosts();
  }, []);
      
  function onInputChange(event){
    setPost(event.target.value);
  }
  async function submitPost() {
    let ownerPosts = await contract.payToPost(post);
    return ownerPosts;
  }


  const getOwnerPosts= async () => {
    console.log(signer);
    console.log(signer._address)
    let ownerPosts = await contract.getPostsSpecificAddr(signer.getAddress());
    setOwnerMemories(ownerPosts);
    console.log(ownerMemories);
    console.log('Did getPostsSpecificAddr with result: ')
    console.log(ownerPosts);
    return ownerPosts;
  };

  return (
    <div>
      <WalletBalance />
      <input type="text" placeholder='Your Post Here' onChange={onInputChange} />
      <button onClick={submitPost}>Submit Post </button>

      <h1>Owner LH Memories</h1>
      <div className="container">
        <div className="row">
            <h3> Owner Memories Here </h3>
            <button onClick={getOwnerPosts}> Get OwnerPost </button>
            <div>
            {
            ownerMemories.map(function (memory){
            return <h5>{memory}</h5>
            })
            }
            </div>
        </div>
      </div>
    </div>
  );
}


export default LhMemoriesComp;
