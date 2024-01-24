tested on ganache locally
uses TS, node, mysql, ethers

please set provider URL in indexer.js , db connexion data

SETUP :
npm i
npm run serve

POST - localhost:99/list?addrs=
body - []array of token address strings
query - addrs : address of accounts to query