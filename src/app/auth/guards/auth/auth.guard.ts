import { inject, Signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, User } from '../../auth-service/auth.service';
import { filter, map, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.user).pipe(
    filter(user => user !== undefined), // Wait until the user is either fetched or confirmed to be null
    take(1), // Take the first emitted non-undefined value
    map(user => {
      if(!!user) {
        return true;
      }
      else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

