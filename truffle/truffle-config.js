module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
        },
        // rinkeby: {
        //     provider: () => new HDWalletProvider(
        //         "exotic dolphin admit grace bounce crystal coffee layer fame cool rescue fee",
        //         "http://127.0.0.1:7545"
        //     ),
        //     network_id: 4,
        //     gas: 5500000,
        //     gasPrice: 10000000000,
        // },
        // Add more networks as needed
    },
    compilers: {
        solc: {
            version: "0.8.13",    // Specify compiler version
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    },
};
