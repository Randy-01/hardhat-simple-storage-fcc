const { ethers, run, network } = require("hardhat")

async function main() {
    const contractFactory = await ethers.getContractFactory("SimpleStorage")
    const simpleStorage = await contractFactory.deploy()
    console.log("Deploying, please wait...")
    await simpleStorage.deployed
    let address = await simpleStorage.getAddress()
    console.log(`Contract address: ${address}`)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(address, [])
    }
    let currentValue = await simpleStorage.retrieve()
    console.log(`currentValue: ${currentValue}`)
    let store = await simpleStorage.store(7)
    await store.wait(1)
    let value = await simpleStorage.retrieve()
    console.log(`value: ${value}`)
}

async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
