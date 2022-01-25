import { useEffect, useState } from 'react';
import Electionabi from './contracts/Election.json';
import Web3 from "web3";
import Navbar from './Components/Navbar';
import Content from './Components/Content';
import Admin from './Components/Admin/Admin';

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [loader, setLoader] = useState(true);
  const [electionData, setElectionData] = useState();
  const [candidate1, setCandidate1] = useState();
  const [candidate2, setCandidate2] = useState();
  const [admin, setAdmin] = useState();
  // const [votingstat, setVotingstat] = useState(Boolean);
  const [resultStat, setResultStat] = useState(false);

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying metamask!"
      )
    }
  }

  const loadBlockchaindata = async () => {
    setLoader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentAccount(account)

    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
      const candidate1 = await election.methods.candidates(1).call();
      const candidate2 = await election.methods.candidates(2).call();
      const admin = await election.methods.admin.call().call();
      // const votingstats = await election.methods.votingStatus(currentAccount).call();
      const resultstats = await election.methods.resultStatus.call().call();

      setCandidate1(candidate1);
      setCandidate2(candidate2);
      setElectionData(election);
      setAdmin(admin);
      // setVotingstat(votingstats);
      setLoader(false);
      setResultStat(resultstats);
      // console.log(admin);
      console.log(resultstats);
    }
    else {
      window.alert("The smart contract is not deployed current network")
    }
  }

  const vote = async (candidateId) => {
    setLoader(true);
    await electionData.methods.vote(candidateId).send({ from: currentAccount }).on('transactionhash', (hash) => {
      alert('Vote registered successfully /nThank you for voting');
      console.log(hash)
    })
    setLoader(false);
  }

  const declareResults = async () => {
    setLoader(true);
    await electionData.methods.declareResult().send({ from: currentAccount })
    setLoader(false)
  }

  if (loader) {
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar currentAccount={currentAccount} />
      {currentAccount != admin ? <Content candidate1={candidate1} candidate2={candidate2} /*votingstat={votingstat}*/ currentAccount={currentAccount} vote={vote} resultStat={resultStat} /> : <Admin candidate1={candidate1} candidate2={candidate2} resultStat={resultStat} declareResults={declareResults} />}
    </div>
  );
}

export default App;
