import {Component, Inject, OnInit} from '@angular/core';
import {Book} from '../../service/book';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books!: Observable<Book[]>;

  constructor(private bookService: BookService,
              private router: Router,
              private toasrt: ToastrService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.books = this.bookService.getBooksList();
    console.log(this.books);
  }

  deleteBook(id: number): void {
    // if (confirm('Do you want to delete it?')) {
      this.bookService.deleteBook(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
            this.toasrt.success('Deleted successfully', 'Xoá thành công');
          },
          error => {
            console.log(error);
            this.toasrt.warning('Có lỗi xảy ra, không thể xoá được file.', 'Error happing while deleting!');
          });
    // }
  }

  bookDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  // tslint:disable-next-line:typedef
  openDialog(id: number, title: string, author: string, description: string): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '400px',
      data: {id, title, author, description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.title = result;
      if (result) {
        this.deleteBook(id);
      }
      console.log(result);
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  template: `
    <div mat-dialog-content class="mat-typography">
      <p>Do you want to delete <strong>{{ data.title }}</strong>?</p>
      <div>
        <label><b>Tên sách: </b></label> {{data.title}}
      </div>
      <div>
        <label><b>Tác giả: </b></label> {{data.author}}
      </div>
      <div>
        <label><b>Mô tả: </b></label> {{ data.description.substring(0, 100)}}...
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="data.id" cdkFocusInitial>Xoá sách</button>
      <button mat-stroked-button color="basic" (click)="onNoClick()">Thoát</button>
    </div>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


export interface DialogData {
  id: number;
  title: string;
  author: string;
  description: string;
}
