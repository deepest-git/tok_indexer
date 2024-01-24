import { ethers, getAddress } from 'ethers';
import { knex } from '../db/db';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

// Function to query transfers by address and tokAddrs is an array of token strings
/*
save/update data in db every time it's successfully fetched, else if fetch fails - read from db and return
*/
const getTransfersByAddress = async (address, tokAddrs) => {

    // const tokenAddress = '0xd47cfDAF2e85A7c6276707C8a1474C70CC85D1D9';
    let data = []
    let tasks = tokAddrs.map(tokenAddress => (async () => {
        const tokenAbi = [
            'event Transfer(address indexed from, address indexed to, uint256 value)',
        ];

        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        // Get the ERC-20 Transfer events
        const filter = tokenContract.filters.Transfer(address, null, null);
        const transferEvents = await tokenContract.queryFilter(filter);

        // Process and display the transfer events

        console.log(`Transfers for address ${address}:`);
        transferEvents.forEach((event) => {
            const { from, to, value } = event.args
            console.log(`Token: ${tokenAddress} From: ${from}, To: ${to}, Amount: ${value}`);
            data.push({ token: tokenAddress, from: from.toString(), to: to.toString(), value: value.toString() })
        });
    })())

    try {
        await Promise.all(tasks)
        save({ logs: data }).catch(err => {
            console.error(err.message)
        })
    } catch (error) {
        //failed - get from db
        return await get()
    }

    return data
};


const save = async ({ logs }) => {
    let vals = logs.map(log => {
        return {
            'token_addrs': [log.token],
            'from_addr': [log.from],
            'to_addr': [log.to],
            'value': [log.value]
        }
    })
    await knex('tok_logs').upsert(vals)
}

const get = async () => {
    return await knex.select().table('tok_logs')
}

const getAddressByQuery = (addressToQuery, tokAddrsArr) => {
    // const addressToQuery_ = '0x22028E864284080c38D1351520167D9aB52A7f83';
    return getTransfersByAddress(addressToQuery, tokAddrsArr);
}

export { getAddressByQuery }