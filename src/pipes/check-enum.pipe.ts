import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export enum CarTypeEnum {
    id = 1,
    idString = '1',
}

export class CheckEnum<T> implements PipeTransform{
    #_defauldEnum: T;
    constructor(defauldValue: T){
        this.#_defauldEnum = defauldValue
    }
    transform(value: any, metadata: ArgumentMetadata) {
        
        
    }
}