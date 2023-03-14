"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFollowModule__factory = void 0;
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
        name: "FollowNotApproved",
        type: "error",
    },
    {
        inputs: [],
        name: "InitParamsInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "NotHub",
        type: "error",
    },
    {
        inputs: [],
        name: "NotProfileOwner",
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
                internalType: "address[]",
                name: "addresses",
                type: "address[]",
            },
            {
                internalType: "bool[]",
                name: "toApprove",
                type: "bool[]",
            },
        ],
        name: "approve",
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
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "followNFTTokenId",
                type: "uint256",
            },
        ],
        name: "followModuleTransferHook",
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
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "initializeFollowModule",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "profileOwner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "toCheck",
                type: "address",
            },
        ],
        name: "isApproved",
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
                name: "profileOwner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "profileId",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "toCheck",
                type: "address[]",
            },
        ],
        name: "isApprovedArray",
        outputs: [
            {
                internalType: "bool[]",
                name: "",
                type: "bool[]",
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
                internalType: "address",
                name: "follower",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "followNFTTokenId",
                type: "uint256",
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
    {
        inputs: [
            {
                internalType: "address",
                name: "follower",
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
        name: "processFollow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b50604051610fff380380610fff83398101604081905261002f916100a0565b806001600160a01b038116610057576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660808190526040514281527ff1a1fa6b64aa95186f5a1285e76198d0da80d9c5a88062641d447f1d7c54e56c9060200160405180910390a250506100d0565b6000602082840312156100b257600080fd5b81516001600160a01b03811681146100c957600080fd5b9392505050565b608051610eea61011560003960008181610145015281816101bd0152818161021401528181610333015281816104c00152818161051701526106a00152610eea6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639713958a1161005b5780639713958a14610120578063a4c52b8614610140578063b47d869b1461017f578063f16466cf1461019257600080fd5b80630e096ae11461008d5780633cb22cc4146100a2578063451c3d0c146100b657806351615fee146100de575b600080fd5b6100a061009b3660046109a5565b6101b2565b005b6100a06100b0366004610a01565b50505050565b6100c96100c4366004610a49565b610310565b60405190151581526020015b60405180910390f35b6100c96100ec366004610a81565b6001600160a01b03928316600090815260208181526040808320948352938152838220929094168152925290205460ff1690565b61013361012e366004610ac3565b6104b3565b6040516100d59190610b0f565b6101677f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100d5565b6100a061018d366004610ba9565b610667565b6101a56101a0366004610c23565b61083e565b6040516100d59190610c73565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146101fb576040516313bd2e8360e31b815260040160405180910390fd5b6040516331a9108f60e11b8152600481018490526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa158015610263573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102879190610cad565b6001600160a01b038082166000908152602081815260408083208984528252808320938a168352929052205490915060ff166102d6576040516359e0a4bf60e11b815260040160405180910390fd5b6001600160a01b0390811660009081526020818152604080832096835295815285822096909216815294905250509020805460ff19169055565b60405163a9ec656360e01b81526004810184905260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a9ec656390602401602060405180830381865afa15801561037a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061039e9190610cad565b90506001600160a01b0381166103b85760009150506104ac565b821561043b576040516331a9108f60e11b8152600481018490526001600160a01b038086169190831690636352211e90602401602060405180830381865afa158015610408573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042c9190610cad565b6001600160a01b0316146104a8565b6040516370a0823160e01b81526001600160a01b0385811660048301528216906370a0823190602401602060405180830381865afa158015610481573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a59190610cca565b15155b9150505b9392505050565b6060336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104fe576040516313bd2e8360e31b815260040160405180910390fd5b6040516331a9108f60e11b8152600481018590526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa158015610566573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058a9190610cad565b905082156106275760006105a084860186610cf9565b805190915060005b81811015610623576001600160a01b0384166000908152602081815260408083208b845290915281208451600192908690859081106105e9576105e9610dbe565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff19169115159190911790556001016105a8565b5050505b83838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509298975050505050505050565b828114610687576040516348be0eb360e01b815260040160405180910390fd5b6040516331a9108f60e11b8152600481018690526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e90602401602060405180830381865afa1580156106ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107139190610cad565b9050336001600160a01b0382161461073e5760405163f194fae560e01b815260040160405180910390fd5b8360005b818110156107ea5784848281811061075c5761075c610dbe565b90506020020160208101906107719190610de4565b6001600160a01b0384166000908152602081815260408083208c84529091528120908989858181106107a5576107a5610dbe565b90506020020160208101906107ba9190610dff565b6001600160a01b031681526020810191909152604001600020805460ff1916911515919091179055600101610742565b5086826001600160a01b03167fc67fc3972da5d6434ab7b796ba133c240d40ee4e69129963c5aa0f2a6f7c3ad6888888884260405161082d959493929190610e1c565b60405180910390a350505050505050565b606060008267ffffffffffffffff81111561085b5761085b610ce3565b604051908082528060200260200182016040528015610884578160200160208202803683370190505b5090508260005b81811015610928576001600160a01b0388166000908152602081815260408083208a84529091528120908787848181106108c7576108c7610dbe565b90506020020160208101906108dc9190610dff565b6001600160a01b03168152602081019190915260400160002054835160ff9091169084908390811061091057610910610dbe565b9115156020928302919091019091015260010161088b565b50909695505050505050565b6001600160a01b038116811461094957600080fd5b50565b803561095781610934565b919050565b60008083601f84011261096e57600080fd5b50813567ffffffffffffffff81111561098657600080fd5b60208301915083602082850101111561099e57600080fd5b9250929050565b600080600080606085870312156109bb57600080fd5b84356109c681610934565b935060208501359250604085013567ffffffffffffffff8111156109e957600080fd5b6109f58782880161095c565b95989497509550505050565b60008060008060808587031215610a1757600080fd5b843593506020850135610a2981610934565b92506040850135610a3981610934565b9396929550929360600135925050565b600080600060608486031215610a5e57600080fd5b833592506020840135610a7081610934565b929592945050506040919091013590565b600080600060608486031215610a9657600080fd5b8335610aa181610934565b9250602084013591506040840135610ab881610934565b809150509250925092565b600080600060408486031215610ad857600080fd5b83359250602084013567ffffffffffffffff811115610af657600080fd5b610b028682870161095c565b9497909650939450505050565b600060208083528351808285015260005b81811015610b3c57858101830151858201604001528201610b20565b81811115610b4e576000604083870101525b50601f01601f1916929092016040019392505050565b60008083601f840112610b7657600080fd5b50813567ffffffffffffffff811115610b8e57600080fd5b6020830191508360208260051b850101111561099e57600080fd5b600080600080600060608688031215610bc157600080fd5b85359450602086013567ffffffffffffffff80821115610be057600080fd5b610bec89838a01610b64565b90965094506040880135915080821115610c0557600080fd5b50610c1288828901610b64565b969995985093965092949392505050565b60008060008060608587031215610c3957600080fd5b8435610c4481610934565b935060208501359250604085013567ffffffffffffffff811115610c6757600080fd5b6109f587828801610b64565b6020808252825182820181905260009190848201906040850190845b81811015610928578351151583529284019291840191600101610c8f565b600060208284031215610cbf57600080fd5b81516104ac81610934565b600060208284031215610cdc57600080fd5b5051919050565b634e487b7160e01b600052604160045260246000fd5b60006020808385031215610d0c57600080fd5b823567ffffffffffffffff80821115610d2457600080fd5b818501915085601f830112610d3857600080fd5b813581811115610d4a57610d4a610ce3565b8060051b604051601f19603f83011681018181108582111715610d6f57610d6f610ce3565b604052918252848201925083810185019188831115610d8d57600080fd5b938501935b82851015610db257610da38561094c565b84529385019392850192610d92565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b8035801515811461095757600080fd5b600060208284031215610df657600080fd5b6104ac82610dd4565b600060208284031215610e1157600080fd5b81356104ac81610934565b6060808252810185905260008660808301825b88811015610e5f578235610e4281610934565b6001600160a01b0316825260209283019290910190600101610e2f565b5083810360208581019190915286825291508690820160005b87811015610e9d57610e8983610dd4565b151582529183019190830190600101610e78565b50809350505050826040830152969550505050505056fea264697066735822122055d6394975f317bc945e082822971e688ecaaefdaa339fd1a96b20899c144bb564736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class ApprovalFollowModule__factory extends ethers_1.ContractFactory {
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
exports.ApprovalFollowModule__factory = ApprovalFollowModule__factory;
ApprovalFollowModule__factory.bytecode = _bytecode;
ApprovalFollowModule__factory.abi = _abi;
