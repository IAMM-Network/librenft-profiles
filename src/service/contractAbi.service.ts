import { DocumentDefinition, FilterQuery } from "mongoose";
import { ContractABI, ContractABIDocument} from "../model/contract.model";
import log from "../logger";


export async function createAbi(input: DocumentDefinition<ContractABIDocument>){

    try { 

        return await ContractABI.create(input);
    } catch(error: any) {
        throw new Error(error);
    }

}

export async function findABI(query: FilterQuery<ContractABIDocument>){
    const dbABI = await ContractABI.findOne(query).lean();
    if(dbABI){
        log.info(dbABI);
    } else {
        log.info(`search of user ${query.toJSON} did not produce a result`)
    }
    return dbABI;
}
