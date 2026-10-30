import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";

export function authInterceptor(
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn) {

  const authToken = inject(AuthService).token();

  // console.log({token});
  
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}