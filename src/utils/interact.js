import { ethers } from 'ethers'
import Beau from '../artifacts/contracts/Beau.sol/Beau.json'

const contractAddress = '0x09B82D3b04d470f88F311a96b7BF1A93c86a4990'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractSigner = new ethers.Contract(contractAddress, Beau.abi, signer)
const contract = new ethers.Contract(contractAddress, Beau.abi, provider)

export async function requestAccount() {
  try {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  } catch (error) {
    console.error(error);
    console.log('Login to Metamask first')
  }
}

export const getPictures = async () => {


  if (typeof window.ethereum !== 'undefined') {

    await requestAccount()

    const count = await contract.getPictureCount()

    let pictures = []

    for (let i = 0; i < count; i++) {

      try {

        let tnx = new Promise(async resolve => {
          const res = await contract.getPictures(i)
          resolve(res)
        })
        pictures.push(tnx)

      } catch (err) {
        console.log('Error: ', err);
      }

    }
    return await Promise.all(pictures)


  }
}


export const createPicture = async (name, desc, UD, url) => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {
      const txHash = await contractSigner.createPicture(name, desc, UD, url, {value: '0'})
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

export const setDownload = async (index) => {

  if (typeof window.ethereum !== 'undefined') {

    try {
      const txHash = await contractSigner.setDownload(index, {value: '0'})
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

export const setLike = async (index) => {

  if (typeof window.ethereum !== 'undefined') {

    try {
      const txHash = await contractSigner.setLike(index, {value: '0'})
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

export const sendTip = async  (receiver, amount) => {

  await requestAccount()

    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      const transaction = [{
        from: accounts[0],
        to: receiver,
        value: ethers.utils.parseUnits(amount, 'ether').toHexString()
      }]

      const transactionHash = await provider.send('eth_sendTransaction', transaction)
      console.log(`Hash: ${transactionHash}`)
      return transactionHash
    } catch(err){
      console.log(err)
    }

}