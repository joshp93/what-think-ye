import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient) { }

  getQRCode(id: string): Promise<string | ArrayBuffer> {

    return new Promise<string | ArrayBuffer>((resolve) => {
      const params = new HttpParams()
        .append("size", "300x300")
        .append("data", `${origin}/${id}`);
      this.http.get(`https://api.qrserver.com/v1/create-qr-code/`, { params: params, responseType: 'blob' }).subscribe(result => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false);

        reader.readAsDataURL(result);
      });
    });
  }
}
