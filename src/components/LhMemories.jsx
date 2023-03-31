// import process from 'process';
import { useEffect, useState } from 'react';

import WalletBalance from './WalletBalance';
import { ethers, utils } from 'ethers';
// import web3_eth_abi from "web3-eth-abi";

import './LhMemories.css'

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
      <h1 className='text-center lh-memories-title'>LH Memories: Save your memories in Blockchain</h1>
      <WalletBalance />
      <div class="input-group mb-3" style={{padding:"10px"}}>
        <input type="text" class="form-control" placeholder="Put Your Memory Here" aria-label="Your Memory" aria-describedby="basic-addon2" onChange={onInputChange}/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary btn-navy" type="button" onClick={submitPost}>Submit</button>
        </div>
      </div>

      <div className="container">
        <div className="row">
            <h3 className='text-center lh-memories-title'> Owner Memories Here </h3>
            <button onClick={getOwnerPosts} class="btn btn-navy"> Get Owner Posts </button>
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
