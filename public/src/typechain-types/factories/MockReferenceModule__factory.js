"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockReferenceModule__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "pubId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "initializeReferenceModule",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "profileIdPointed",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "pubIdPointed",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "processComment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "profileIdPointed",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "pubIdPointed",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "processMirror",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506102a6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806356014afa1461004657806357ba55841461006f578063a2830b2e1461006f575b600080fd5b61005961005436600461014e565b610086565b60405161006691906101a1565b60405180910390f35b61008461007d3660046101f6565b5050505050565b005b6060600061009683850185610257565b9050806001146100ec5760405162461bcd60e51b815260206004820152601c60248201527f4d6f636b5265666572656e63654d6f64756c653a20696e76616c696400000000604482015260640160405180910390fd5b5050604080516000815260208101909152949350505050565b60008083601f84011261011757600080fd5b50813567ffffffffffffffff81111561012f57600080fd5b60208301915083602082850101111561014757600080fd5b9250929050565b6000806000806060858703121561016457600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561018957600080fd5b61019587828801610105565b95989497509550505050565b600060208083528351808285015260005b818110156101ce578581018301518582016040015282016101b2565b818111156101e0576000604083870101525b50601f01601f1916929092016040019392505050565b60008060008060006080868803121561020e57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561023a57600080fd5b61024688828901610105565b969995985093965092949392505050565b60006020828403121561026957600080fd5b503591905056fea2646970667358221220ed0ca6d5cb5edd76dfc129febeb246d4611b68b6e7b484d3557b01b4f71e548464736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class MockReferenceModule__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MockReferenceModule__factory = MockReferenceModule__factory;
MockReferenceModule__factory.bytecode = _bytecode;
MockReferenceModule__factory.abi = _abi;
