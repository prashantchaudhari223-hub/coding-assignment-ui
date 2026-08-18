import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add the authorization header with the token
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.accessToken}`
    }
  });
  return next(authReq);
};
