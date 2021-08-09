import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HomePageService } from './services/home-page.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    HomePageComponent,
    UserFormComponent, 
    DeleteModalComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatProgressBarModule,
    NgxMaskModule.forRoot(maskConfig)

  ],
  providers: [
    HomePageService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class HomePageModule { }
