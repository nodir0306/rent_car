import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response} from "express";


@Injectable()
export class loggerMiddleware implements NestMiddleware {
    use(req: Request,res: Response, next: NextFunction){
        const requestsTime = new Date().toISOString();

        console.log({
            url: req.url,
            method: req.method,
            time: requestsTime
        });
        next();
    }
}