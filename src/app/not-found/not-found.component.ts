import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  firstname: string | undefined;
  private service = inject(UserService);

  ngOnInit() {
    this.firstname = this.service.user['firstName'];
  }

}

