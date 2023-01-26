import { DocumentDefinition, FilterQuery } from "mongoose";
import { Contract, ContractDocument} from "../model/contract.model";
import log from "../logger";


export async function createContract(input: DocumentDefinition<ContractDocument>){

    try {         
        return await Contract.create(input);
    } catch(error: any) {
        throw new Error(error);
    }

}

export async function findContract(query: FilterQuery<ContractDocument>){
    const dbContract = await Contract.findOne(query).lean();
    if(dbContract){
        log.info(dbContract);
    } else {
        log.info(`search of user ${query.toJSON} did not produce a result`)
    }
    return dbContract;
}
