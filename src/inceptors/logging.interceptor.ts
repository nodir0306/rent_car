import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable,tap } from "rxjs";


export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log("so'rov keldi...");
    const requestsTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        console.log(`Javob keldi, vaqt farqi: ${Date.now() - requestsTime}ms`);
      })
    );
  }
}
