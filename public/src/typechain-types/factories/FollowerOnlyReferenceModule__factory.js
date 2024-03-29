"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerOnlyReferenceModule__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "hub",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "FollowInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "InitParamsInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "HUB",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
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
        stateMutability: "view",
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
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b5060405161077a38038061077a83398101604081905261002f916100a0565b806001600160a01b038116610057576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660808190526040514281527ff1a1fa6b64aa95186f5a1285e76198d0da80d9c5a88062641d447f1d7c54e56c9060200160405180910390a250506100d0565b6000602082840312156100b257600080fd5b81516001600160a01b03811681146100c957600080fd5b9392505050565b6080516106756101056000396000818160a60152818160f901528181610199015281816102b701526103c501526106756000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806356014afa1461005157806357ba55841461008c578063a2830b2e1461008c578063a4c52b86146100a1575b600080fd5b61007661005f3660046104cb565b505060408051600081526020810190915292915050565b604051610083919061051e565b60405180910390f35b61009f61009a366004610573565b6100e0565b005b6100c87f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610083565b6040516331a9108f60e11b8152600481018690526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa158015610148573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016c91906105d4565b90506101788582610180565b505050505050565b604051633648f48360e21b8152600481018390526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063d923d20c90602401602060405180830381865afa1580156101e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020c91906105d4565b905060006001600160a01b0382161561029e576040516311470f4360e21b8152600481018590526001600160a01b0384811660248301526000604483015283169063451c3d0c90606401602060405180830381865afa158015610273573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102979190610604565b90506103b0565b60405163a9ec656360e01b8152600481018590526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9ec656390602401602060405180830381865afa158015610306573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032a91906105d4565b90506001600160a01b038116158015906103ac57506040516370a0823160e01b81526001600160a01b0385811660048301528216906370a0823190602401602060405180830381865afa158015610385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a99190610626565b15155b9150505b8015801561045e5750826001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e866040518263ffffffff1660e01b815260040161041191815260200190565b602060405180830381865afa15801561042e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045291906105d4565b6001600160a01b031614155b1561047c57604051636992d36b60e11b815260040160405180910390fd5b50505050565b60008083601f84011261049457600080fd5b50813567ffffffffffffffff8111156104ac57600080fd5b6020830191508360208285010111156104c457600080fd5b9250929050565b600080600080606085870312156104e157600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561050657600080fd5b61051287828801610482565b95989497509550505050565b600060208083528351808285015260005b8181101561054b5785810183015185820160400152820161052f565b8181111561055d576000604083870101525b50601f01601f1916929092016040019392505050565b60008060008060006080868803121561058b57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff8111156105b757600080fd5b6105c388828901610482565b969995985093965092949392505050565b6000602082840312156105e657600080fd5b81516001600160a01b03811681146105fd57600080fd5b9392505050565b60006020828403121561061657600080fd5b815180151581146105fd57600080fd5b60006020828403121561063857600080fd5b505191905056fea2646970667358221220d019cbde25020c8f80ed110707cd09c0f2618c56dc86fd722b7ca137b6cef87e64736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class FollowerOnlyReferenceModule__factory extends ethers_1.ContractFactory {
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
exports.FollowerOnlyReferenceModule__factory = FollowerOnlyReferenceModule__factory;
FollowerOnlyReferenceModule__factory.bytecode = _bytecode;
FollowerOnlyReferenceModule__factory.abi = _abi;
