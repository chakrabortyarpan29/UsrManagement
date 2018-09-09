import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../model/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:24369/api/User';

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addUser (user: User): void {
    this.dialogData = user;
    this.httpClient.post(this.API_URL, user).subscribe(data => {
      this.dialogData = user;
      alert("Successfully Added User.");
      },
      (err: HttpErrorResponse) => {
        alert(err.message)
    });
  }

  updateUser (user: User): void {
    this.httpClient.put(this.API_URL + user.id, user).subscribe(data => {
      this.dialogData = user;
      alert("Successfully Updated User.");
    },
    (err: HttpErrorResponse) => {
      alert(err.message);
    }
  );
  }

  deleteUser (id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      alert("Successfully Deleted User.");
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }
}


