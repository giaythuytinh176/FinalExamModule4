import {Component, OnInit} from '@angular/core';
import {Book} from '../../service/book';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BookService} from '../../service/book.service';

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
    if (confirm('Do you want to delete it?')) {
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
    }
  }

  bookDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

}
