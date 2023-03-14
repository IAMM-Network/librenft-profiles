/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface AccessControlV2Interface extends utils.Interface {
  functions: {
    "hasAccess(address,uint256,bytes)": FunctionFragment;
    "hasCollected(address,uint256,uint256,uint256,bytes)": FunctionFragment;
    "initialize()": FunctionFragment;
    "isFollowing(address,uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "hasAccess",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasCollected",
    values: [string, BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isFollowing",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "hasAccess", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasCollected",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isFollowing",
    data: BytesLike
  ): Result;

  events: {};
}

export interface AccessControlV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccessControlV2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    hasAccess(
      requestorAddress: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hasCollected(
      requestorAddress: string,
      publisherId: BigNumberish,
      pubId: BigNumberish,
      collectorProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isFollowing(
      requestorAddress: string,
      profileId: BigNumberish,
      followerProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  hasAccess(
    requestorAddress: string,
    profileId: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hasCollected(
    requestorAddress: string,
    publisherId: BigNumberish,
    pubId: BigNumberish,
    collectorProfileId: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isFollowing(
    requestorAddress: string,
    profileId: BigNumberish,
    followerProfileId: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    hasAccess(
      requestorAddress: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hasCollected(
      requestorAddress: string,
      publisherId: BigNumberish,
      pubId: BigNumberish,
      collectorProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(overrides?: CallOverrides): Promise<void>;

    isFollowing(
      requestorAddress: string,
      profileId: BigNumberish,
      followerProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    hasAccess(
      requestorAddress: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasCollected(
      requestorAddress: string,
      publisherId: BigNumberish,
      pubId: BigNumberish,
      collectorProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isFollowing(
      requestorAddress: string,
      profileId: BigNumberish,
      followerProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    hasAccess(
      requestorAddress: string,
      profileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasCollected(
      requestorAddress: string,
      publisherId: BigNumberish,
      pubId: BigNumberish,
      collectorProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isFollowing(
      requestorAddress: string,
      profileId: BigNumberish,
      followerProfileId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}