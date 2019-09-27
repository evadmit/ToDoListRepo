import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(private storage: Storage
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);

    return from(this.storage.get('ACCESS_TOKEN'))
      .pipe(
        switchMap(token => {
          console.log(token);

          if (token) {
            request = request.clone({
              setHeaders: {
                'Authorization': ('Bearer ' + token)
              }
            });
          }

          if (!request.headers.has('Content-Type')) {
            request = request.clone({
              setHeaders: {
                'Content-Type': 'application/json'
              }
            });
          }

          request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
          });

          request = request.clone({
            headers: request.headers.set('Access-Control-Allow-Origin', '*')
          });


          console.log(request);

        
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              console.log(event);

              if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
              }

              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              console.error(error);
              return throwError(error);
            }));
        }))
  }



}
