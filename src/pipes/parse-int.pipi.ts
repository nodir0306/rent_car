import { ArgumentMetadata, NotAcceptableException, PipeTransform } from "@nestjs/common";

export class ParseIntCustomPipe implements PipeTransform{
    #_defauldNumber: number
    constructor(defauldValue: number){
        this.#_defauldNumber = defauldValue
    }
    transform(value: any, metadata: ArgumentMetadata) {
        const number = parseInt(value,10)
        if(!value) return this.#_defauldNumber
        console.log(metadata.type,metadata.data, metadata.metatype)
        if(isNaN(number)){
            throw new NotAcceptableException(`${metadata.data} should be number`)
        }

        return number

    }
}