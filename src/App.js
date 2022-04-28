import './App.css';
import { useState, useEffect } from 'react';
import NFTContainer from './NFTContainer';

function App() {

  // Defines variable walletAddress that can be changed using the setWalletAddress function. 
  const [walletAddress, setWalletAddress] = useState(null)

  // Connect to users wallet.
  const connectWallet = async () => {

    // Check that metamask is installed.
    if (typeof window.ethereum !== 'undefined') {

      // Wait to connect to metamask.
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Set wallet address to the first account.
      setWalletAddress(accounts[0])
    }
  }

  // Get NFT Data from wallet.
  const getNFTData = async () => {
    // If no wallet address then dont run function.
    if(!walletAddress) return;

    // Get items owned by the owner of this account.
    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`)

    // Turn response data into json.
    const data = await response.json()
  }

  // Anytime walletAddress changes get NFT data.
  useEffect(() => {
    getNFTData()
  }, [walletAddress])

  return (
    <div className="App">
        <div>
          Account: {walletAddress}
        </div>
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
        <NFTContainer/>
    </div>
  );
}

export default App;
