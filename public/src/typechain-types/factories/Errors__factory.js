"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "ArrayMismatch",
        type: "error",
    },
    {
        inputs: [],
        name: "BlockNumberInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "CallerNotCollectNFT",
        type: "error",
    },
    {
        inputs: [],
        name: "CallerNotFollowNFT",
        type: "error",
    },
    {
        inputs: [],
        name: "CallerNotWhitelistedModule",
        type: "error",
    },
    {
        inputs: [],
        name: "CannotCommentOnSelf",
        type: "error",
    },
    {
        inputs: [],
        name: "CannotInitImplementation",
        type: "error",
    },
    {
        inputs: [],
        name: "CollectExpired",
        type: "error",
    },
    {
        inputs: [],
        name: "CollectModuleNotWhitelisted",
        type: "error",
    },
    {
        inputs: [],
        name: "CollectNotAllowed",
        type: "error",
    },
    {
        inputs: [],
        name: "EmergencyAdminCannotUnpause",
        type: "error",
    },
    {
        inputs: [],
        name: "FollowInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "FollowModuleNotWhitelisted",
        type: "error",
    },
    {
        inputs: [],
        name: "FollowNotApproved",
        type: "error",
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
        inputs: [],
        name: "HandleTaken",
        type: "error",
    },
    {
        inputs: [],
        name: "InitParamsInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "Initialized",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidParameter",
        type: "error",
    },
    {
        inputs: [],
        name: "MintLimitExceeded",
        type: "error",
    },
    {
        inputs: [],
        name: "ModuleDataMismatch",
        type: "error",
    },
    {
        inputs: [],
        name: "NotDispatcher",
        type: "error",
    },
    {
        inputs: [],
        name: "NotGovernance",
        type: "error",
    },
    {
        inputs: [],
        name: "NotGovernanceOrEmergencyAdmin",
        type: "error",
    },
    {
        inputs: [],
        name: "NotHub",
        type: "error",
    },
    {
        inputs: [],
        name: "NotOwnerOrApproved",
        type: "error",
    },
    {
        inputs: [],
        name: "NotProfileOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "NotProfileOwnerOrDispatcher",
        type: "error",
    },
    {
        inputs: [],
        name: "NotWhitelisted",
        type: "error",
    },
    {
        inputs: [],
        name: "Paused",
        type: "error",
    },
    {
        inputs: [],
        name: "ProfileCreatorNotWhitelisted",
        type: "error",
    },
    {
        inputs: [],
        name: "ProfileImageURILengthInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "PublicationDoesNotExist",
        type: "error",
    },
    {
        inputs: [],
        name: "PublishingPaused",
        type: "error",
    },
    {
        inputs: [],
        name: "ReferenceModuleNotWhitelisted",
        type: "error",
    },
    {
        inputs: [],
        name: "SignatureExpired",
        type: "error",
    },
    {
        inputs: [],
        name: "SignatureInvalid",
        type: "error",
    },
    {
        inputs: [],
        name: "TokenDoesNotExist",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroSpender",
        type: "error",
    },
];
const _bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122069fec1d7d96abd8013ff4497aac82397c62aff93b2030168490c0a1a0ae07b5864736f6c634300080a0033";
const isSuperArgs = (xs) => xs.length > 1;
class Errors__factory extends ethers_1.ContractFactory {
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
exports.Errors__factory = Errors__factory;
Errors__factory.bytecode = _bytecode;
Errors__factory.abi = _abi;
