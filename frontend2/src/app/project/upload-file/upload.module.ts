import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './pages/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/result/result.component';
import { TableResultComponent } from './components/table-result/table-result.component';
import { provideNativeDateAdapter } from '@angular/material/core';


@NgModule({
  declarations: [
    UploadComponent,
    ResultComponent,
    TableResultComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    UploadRoutingModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class UploadModule { }
