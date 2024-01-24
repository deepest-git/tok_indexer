module.exports = function (callback) {
    // transferTokens.js
    const MyToken = artifacts.require("MyToken");

    async function transferTokens() {
        // Get an instance of your deployed contract
        let instance = await MyToken.deployed();

        // Replace with the actual recipient's Ethereum address
        let receiverAddress = "0x432B023eF9EbB6Ac879593347D1979717Da1c70C";

        // Replace with the amount of tokens to transfer
        let amount = 1000;

        // Get the sender's balance before the transfer
        let senderBalanceBefore = await instance.balanceOf('0x22028E864284080c38D1351520167D9aB52A7f83');
        console.log("Sender's Balance Before:", senderBalanceBefore.toString());

        // Transfer tokens
        await instance.transfer(receiverAddress, amount, { from:'0x22028E864284080c38D1351520167D9aB52A7f83'});

        // Get the updated balances after the transfer
        let senderBalanceAfter = await instance.balanceOf('0x22028E864284080c38D1351520167D9aB52A7f83');
        let receiverBalance = await instance.balanceOf(receiverAddress);

        console.log("Sender's Balance After:", senderBalanceAfter.toString());
        console.log("Receiver's Balance:", receiverBalance.toString());
    }

    // Run the transferTokens function
    transferTokens()
        .then(() => {
            console.log("Token transfer completed successfully."); callback();
        })
        .catch((error) => {
            console.error("Error during token transfer:", error);
        });


    
}
