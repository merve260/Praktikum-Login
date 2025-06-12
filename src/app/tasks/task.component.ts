import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [
    MatFormFieldModule, MatInputModule, MatSelectModule,  MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  public value: Date;

  constructor() {
    this.value = new Date();
  }


}
