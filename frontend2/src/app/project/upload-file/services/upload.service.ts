import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { uploadFileRequest } from '../models/uploadFileRequest';
import { uploadFileResponse } from '../models/ีuploadFileResponse';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  private serverUrl: string = 'http://localhost:8080/api';

  // testAPI(): Observable<any> {
  //   return this.http.get<any>(this.serverUrl + '/greet', { });
  // }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/upload', data);
  }
}
