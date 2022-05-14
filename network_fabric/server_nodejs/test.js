const fabric = require('./fabric_sdk_node/gateway')
const { BlockDecoder } = require('fabric-common')
const protos = require('fabric-protos')

async function main() {
    try {
        let network = await fabric.gateway('mychannel')
        let contract = network.getContract('hotel');

        let r = await contract.evaluateTransaction('hello');
        // await contract.submitTransaction('InitLedger');

        r = await contract.evaluateTransaction('balanceOf', 'hotelaccount')
        console.log(r);

    } catch (err) {
        console.log(err.message);
    }

}

main()



