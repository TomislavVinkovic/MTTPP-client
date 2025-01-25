import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, take, map } from 'rxjs';
import { AuthService } from '../../auth-service/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.user).pipe(
    filter(user => user !== undefined), // Wait until the user is either fetched or confirmed to be null
    take(1), // Take the first emitted non-undefined value
    map(user => {
      if(!user) {
        return true;
      }
      else {
        router.navigate(['/todos']);
        return false;
      }
    })
  );
};
