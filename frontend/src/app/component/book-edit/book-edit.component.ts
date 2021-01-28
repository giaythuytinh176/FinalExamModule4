import { Component, OnInit } from '@angular/core';
import {Book} from '../../service/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id!: number;
  book!: Book;

  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService,
              private toasrt: ToastrService,
  ) { }

  ngOnInit(): void {
    this.book = new Book();

    this.id = this.route.snapshot.params.id;

    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      }, error => console.log(error));
  }

  updateBook(): void {
    this.bookService.updateBook(this.id, this.book)
      .subscribe(data => {
        console.log(data);
        this.book = new Book();
        this.toasrt.success('Edited successfully', 'Sửa thành công');

        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.updateBook();
  }

  gotoList(): void {
    this.router.navigate(['/books']);
  }
}
