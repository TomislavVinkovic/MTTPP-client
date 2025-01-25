import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let url = `${environment.BASE_URL}/${req.url}`;
  let token = localStorage.getItem('token') ?? "";
  let headers = req.headers.set('Authorization', `Bearer ${token}`);
  
  return next(req.clone({ url, headers }));
};