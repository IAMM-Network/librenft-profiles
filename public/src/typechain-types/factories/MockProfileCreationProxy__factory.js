"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProfileCreationProxy__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract ILensHub",
                name: "hub",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "HandleContainsInvalidCharacters",
        type: "error",
    },
    {
        inputs: [],
        name: "HandleFirstCharInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "HandleLengthInvalid",
        type: "error",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "handle",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "imageURI",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "followModule",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "followModuleInitData",
                        type: "bytes",
                    },
                    {
                        internalType: "string",
                        name: "followNFTURI",
                        type: "string",
                    },
                ],
                internalType: "struct DataTypes.CreateProfileData",
                name: "vars",
                type: "tuple",
            },
        ],
        name: "proxyCreateProfile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b506040516105fd3803806105fd83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b60805161057261008b600039600061018d01526105726000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806307e5f94814610030575b600080fd5b61004361003e3660046102f3565b610045565b005b602081015151600581101561006d57604051633eb64ab360e01b815260040160405180910390fd5b60008260200151600081518110610086576100866103ee565b01602001516001600160f81b0319169050602d60f81b8114806100b65750605f60f81b6001600160f81b03198216145b806100ce5750601760f91b6001600160f81b03198216145b156100ec57604051632f2c22a760e11b815260040160405180910390fd5b60015b82811015610149578360200151818151811061010d5761010d6103ee565b6020910101516001600160f81b031916601760f91b141561014157604051630bb7f19b60e21b815260040160405180910390fd5b6001016100ef565b5060208084015160405161015d9201610430565b60408051601f198184030181529181526020850191909152516001620af63960e11b031981526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ffea138e906101c2908690600401610485565b6020604051808303816000875af11580156101e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102059190610523565b50505050565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff811182821017156102445761024461020b565b60405290565b80356001600160a01b038116811461026157600080fd5b919050565b600082601f83011261027757600080fd5b813567ffffffffffffffff808211156102925761029261020b565b604051601f8301601f19908116603f011681019082821181831017156102ba576102ba61020b565b816040528381528660208588010111156102d357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561030557600080fd5b813567ffffffffffffffff8082111561031d57600080fd5b9083019060c0828603121561033157600080fd5b610339610221565b6103428361024a565b815260208301358281111561035657600080fd5b61036287828601610266565b60208301525060408301358281111561037a57600080fd5b61038687828601610266565b6040830152506103986060840161024a565b60608201526080830135828111156103af57600080fd5b6103bb87828601610266565b60808301525060a0830135828111156103d357600080fd5b6103df87828601610266565b60a08301525095945050505050565b634e487b7160e01b600052603260045260246000fd5b60005b8381101561041f578181015183820152602001610407565b838111156102055750506000910152565b60008251610442818460208701610404565b640b9d195cdd60da1b920191825250600501919050565b60008151808452610471816020860160208601610404565b601f01601f19169290920160200192915050565b60208152600060018060a01b03808451166020840152602084015160c060408501526104b460e0850182610459565b90506040850151601f19808684030160608701526104d28383610459565b925083606088015116608087015260808701519350808684030160a08701526104fb8385610459565b935060a08701519250808685030160c0870152505061051a8282610459565b95945050505050565b60006020828403121561053557600080fd5b505191905056fea2646970667358221220cfc9eca249d819e62f320e603c4786081fcf37cec6449143f378ad1513d7af7d64736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class MockProfileCreationProxy__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(hub, overrides) {
        return super.deploy(hub, overrides || {});
    }
    getDeployTransaction(hub, overrides) {
        return super.getDeployTransaction(hub, overrides || {});
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
exports.MockProfileCreationProxy__factory = MockProfileCreationProxy__factory;
MockProfileCreationProxy__factory.bytecode = _bytecode;
MockProfileCreationProxy__factory.abi = _abi;
