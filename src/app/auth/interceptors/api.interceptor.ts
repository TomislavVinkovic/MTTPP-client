import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let url = `${environment.BASE_URL.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;
  let token = localStorage.getItem('token') ?? "";

  if (!token) {
    return next(req.clone({ url }));
  }
  let headers = req.headers.set('Authorization', `Bearer ${token}`);
  
  return next(req.clone({ url, headers }));
};