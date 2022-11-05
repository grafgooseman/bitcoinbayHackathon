// import MetaMaskOnboarding from '@metamask/onboarding';
const MetaMaskOnboarding = require('@metamask/onboarding'); 
const onboarding = new MetaMaskOnboarding();

const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

let connected = (accounts) => {
    console.log("accounts");
    console.log(accounts);
};

const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
        //If it isn't installed we ask the user to click to install it
        console.log("MetaMask is not installed");
    } else {
        //If it is installed we ask the user to connect to their wallet
        console.log("MetaMask is installed");
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                console.log("Connected to MetaMask");
                connected(accounts);
            } else {
                console.log("Please connect you wallet");
            }
        });
    }
};


async function connectWallet() {
    return await ethereum.request({ method: 'eth_requestAccounts' });
}


const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    console.log("Onboarding started");
}

let metaMaskButton = document.getElementById("metamask-button");
metaMaskButton.addEventListener("click", async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        connected(accounts);
    } catch (error) {
        console.log(error);
    }
});