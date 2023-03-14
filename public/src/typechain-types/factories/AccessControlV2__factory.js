"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlV2__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_lensHub",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "CannotInitImplementation",
        type: "error",
    },
    {
        inputs: [],
        name: "Initialized",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "requestorAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "hasAccess",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "requestorAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "publisherId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "pubId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "collectorProfileId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "hasCollected",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "requestorAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "followerProfileId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "isFollowing",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60c06040526000805534801561001457600080fd5b5060405161090538038061090583398101604081905261003391610048565b306080526001600160a01b031660a052610078565b60006020828403121561005a57600080fd5b81516001600160a01b038116811461007157600080fd5b9392505050565b60805160a05161084d6100b86000396000818160b60152818161017f015281816103100152818161042601526105320152600061027e015261084d6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309cebe76146100515780630efe5469146100785780638129fc1c1461008b578063a34b6ea514610095575b600080fd5b61006461005f36600461068f565b6100a8565b604051901515815260200160405180910390f35b6100646100863660046106e8565b610155565b61009361027a565b005b6100646100a3366004610755565b6102ed565b6000836001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e856040518263ffffffff1660e01b815260040161010291815260200190565b602060405180830381865afa15801561011f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061014391906107b8565b6001600160a01b031614949350505050565b6040516352aaef5560e01b8152600481018590526024810184905260009081906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906352aaef5590604401602060405180830381865afa1580156101c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ea91906107b8565b90506001600160a01b0381161580159061026f57506040516370a0823160e01b81526001600160a01b038881166004830152600091908316906370a0823190602401602060405180830381865afa158015610249573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026d91906107dc565b115b979650505050505050565b60027f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163014156102c6576040516325c7410560e21b815260040160405180910390fd5b60005481116102e8576040516302ed543d60e51b815260040160405180910390fd5b600055565b604051633648f48360e21b81526004810184905260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063d923d20c90602401602060405180830381865afa158015610357573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037b91906107b8565b905060006001600160a01b0382161561040d576040516311470f4360e21b8152600481018790526001600160a01b0388811660248301526000604483015283169063451c3d0c90606401602060405180830381865afa1580156103e2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040691906107f5565b905061051f565b60405163a9ec656360e01b8152600481018790526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9ec656390602401602060405180830381865afa158015610475573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049991906107b8565b90506001600160a01b0381161580159061051b57506040516370a0823160e01b81526001600160a01b0389811660048301528216906370a0823190602401602060405180830381865afa1580156104f4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051891906107dc565b15155b9150505b808061026f5750866001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e886040518263ffffffff1660e01b815260040161057e91815260200190565b602060405180830381865afa15801561059b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bf91906107b8565b6001600160a01b031614979650505050505050565b6001600160a01b03811681146105e957600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261061357600080fd5b813567ffffffffffffffff8082111561062e5761062e6105ec565b604051601f8301601f19908116603f01168101908282118183101715610656576106566105ec565b8160405283815286602085880101111561066f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000606084860312156106a457600080fd5b83356106af816105d4565b925060208401359150604084013567ffffffffffffffff8111156106d257600080fd5b6106de86828701610602565b9150509250925092565b600080600080600060a0868803121561070057600080fd5b853561070b816105d4565b9450602086013593506040860135925060608601359150608086013567ffffffffffffffff81111561073c57600080fd5b61074888828901610602565b9150509295509295909350565b6000806000806080858703121561076b57600080fd5b8435610776816105d4565b93506020850135925060408501359150606085013567ffffffffffffffff8111156107a057600080fd5b6107ac87828801610602565b91505092959194509250565b6000602082840312156107ca57600080fd5b81516107d5816105d4565b9392505050565b6000602082840312156107ee57600080fd5b5051919050565b60006020828403121561080757600080fd5b815180151581146107d557600080fdfea264697066735822122060a0dd8e64bb9d72379e3813687fd6a587389d56e51a77d8778fc1818174daa264736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class AccessControlV2__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_lensHub, overrides) {
        return super.deploy(_lensHub, overrides || {});
    }
    getDeployTransaction(_lensHub, overrides) {
        return super.getDeployTransaction(_lensHub, overrides || {});
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
exports.AccessControlV2__factory = AccessControlV2__factory;
AccessControlV2__factory.bytecode = _bytecode;
AccessControlV2__factory.abi = _abi;
