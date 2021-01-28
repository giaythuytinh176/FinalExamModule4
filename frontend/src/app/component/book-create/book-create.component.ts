import {Component, OnInit} from '@angular/core';
import {Book} from '../../service/book';
import {BookService} from '../../service/book.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  book: Book = new Book();
  // tslint:disable-next-line:variable-name
  error_msg = '';

  constructor(private bookService: BookService,
              private router: Router,
              private toasrt: ToastrService
  ) {
  }

  ngOnInit() {
  }

  newBook(): void {
    this.book = new Book();
  }

  save(): void {
    console.log(this.book);
    this.bookService
      .createBook(this.book)
      .subscribe((data: any) => {
          // console.log(this.error_msg);
          if (this.error_msg) {
            this.toasrt.warning(this.error_msg, 'Error happing while adding!');
          } else {
            this.book = new Book();
            this.toasrt.success('Added successfully', 'Thêm thành công');
            this.gotoList();
          }
        },
        (error: any) => console.log(error));
  }

  onSubmit(): void {
    // console.log(this);
    this.save();
  }

  gotoList(): void {
    this.router.navigate(['/books']);
  }
}
