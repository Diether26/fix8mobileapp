import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { AuthJWTService } from '../AuthJWT/auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthJWTService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(
      tap(
        event => this.handleResponse(request, event),
        error => this.handleError(request, error)
      )
    );
  }

  handleResponse(req: HttpRequest<any>, event: any) {
    // console.log('Handling response for ', req.url, event);
    if (event instanceof HttpResponse) {
      // console.log('Request for ', req.url,
      //     ' Response Status ', event.status,
      //     ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event: any) {
    // console.error('Request for ', req.url,
    //       ' Response Status ', event.status,
    //       ' With error ', event.error);
  }
}
