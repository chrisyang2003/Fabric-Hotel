const fabric = require('./fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')
const protos = require('fabric-protos')

async function main() {
    try {
        let network = await fabric.gateway('mychannel')
        let contract = network.getContract('hotel');

        let r = await contract.evaluateTransaction('hello');
        // await contract.submitTransaction('InitLedger');

        r = await contract.submitTransaction('Mint', 'alice', '20');
        r = await contract.submitTransaction('Mint', 'bob', '20');

        // r = await contract.evaluateTransaction('balanceOf', 'alice');

        r = await contract.submitTransaction('reigster', '123', '123', '{}');
        r = await contract.submitTransaction('reigster', 'alice', '123', '{}');


        console.log(r.toString());
        

    } catch (err) {
        console.log(err.message);
    }

}

main()



