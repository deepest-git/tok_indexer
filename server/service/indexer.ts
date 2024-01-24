import { ethers, getAddress } from 'ethers';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

const tokenAddress = '0xd47cfDAF2e85A7c6276707C8a1474C70CC85D1D9';

const tokenAbi = [
    'event Transfer(address indexed from, address indexed to, uint256 value)',
];

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

// Function to query transfers by address
const getTransfersByAddress = async (address: string) => {
    // Get the ERC-20 Transfer events
    const filter = tokenContract.filters.Transfer(address, null, null);
    const transferEvents = await tokenContract.queryFilter(filter);

    // Process and display the transfer events
    let data: { from: any; to: any; value: any; }[] = []
    console.log(`Transfers for address ${address}:`);
    transferEvents.forEach((event) => {
        const { from, to, value } = event.toJSON();
        console.log(`From: ${from}, To: ${to}, Amount: ${value.toString()}`);
        data.push({ from, to, value })
    });
    return data
};


const getAddressByQuery = (addressToQuery:string) => {
    const addressToQuery_ = '0x22028E864284080c38D1351520167D9aB52A7f83';
    return getTransfersByAddress(addressToQuery_);
}

export { getAddressByQuery }