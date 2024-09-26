import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "@decorators";
import { Request } from "express";


@Injectable()
export class CheckRolesGuard implements CanActivate{
    private roles : string[];

    constructor(private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get(Roles,context.getHandler());
        const { role } = request.body;

        if(!roles)
            return false

        if(!role || !roles.includes(role))
            return false

        return true
    }
}