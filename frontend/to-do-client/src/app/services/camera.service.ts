import { Injectable } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/Camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

 constructor (private camera: Camera) { }
 
  public image: string;

  public options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true,
    targetHeight: 800,
    targetWidth: 800,
  };

 

  public async getPicture() {
    let fired = new Date();
    console.log('Cam fired on:', fired);

    return this.camera.getPicture(this.options)
      .then(imageData => {
        return 'data:image/jpeg;base64,' + imageData;
      }).catch((error) => {
        console.log("Error", error);

        return "../assets/imgs/add_photo.svg";
      });
  }


}
