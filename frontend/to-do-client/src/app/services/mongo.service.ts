import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, AnonymousCredential, StitchAppClient, RemoteMongoDatabase,
  UserPasswordCredential } from 'mongodb-stitch-browser-sdk';

  import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  client: StitchAppClient = null;
  db: RemoteMongoDatabase = null;

  constructor(private authService: AuthService) { }

  initializeAppClient(appID: string) {
    this.client = Stitch.initializeDefaultAppClient(appID);
  }

  getServiceClient(dbName: string) {
    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(dbName);
  }

  login(user) {

    // Anonymous login.
    let credential = new AnonymousCredential();
    if (user !== null) {
      credential = new UserPasswordCredential(user.email, user.password);
      console.log('Authenticated user logged');
    } else {
      console.log('Anonymous user logged');
    }
    return this.client.auth.loginWithCredential(credential);
  }

  
}
