import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { uploadFileRequest } from '../models/uploadFileRequest';
import { uploadFileResponse } from '../models/ีuploadFileResponse';
import { data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  private data!: data[];
  private serverUrl: string = 'http://localhost:8080/api';

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/upload', data);
  }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

}
