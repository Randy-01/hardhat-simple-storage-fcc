const { expect } = require("chai")

describe("SimpleStorage", async function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })
    it("Should start with a favorite number of 0", async function () {
        const expectedValue = "0"
        let value = await simpleStorage.retrieve()
        expect(value.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "9"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        let value = await simpleStorage.retrieve()
        expect(value.toString()).to.equal(expectedValue)
    })
    it("Should add a person correctly", async function () {
        const name = "彩凤"
        const age = "28"
        const transactionResponse = await simpleStorage.addPerson(name, age)
        await transactionResponse.wait(1)
        const person = await simpleStorage.getPerson(0)
        expect(person[0]).to.equal(name)
        expect(person[1].toString()).to.equal(age)

        const mapperAge = await simpleStorage.personMap(name)
        expect(mapperAge.toString()).to.equal(age)
    })
})
