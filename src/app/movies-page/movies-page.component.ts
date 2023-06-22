import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movieList: any[] = [];
  currentPage = 1;
  totalMoviesCount = 400;
  selectedMovie: any;
  showPagination = true;
  apiError = false;

  searchQuery: string = ''
  searchedMovies:any;  
  constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchMovieData();
    
      const searchInput = document.getElementById('search-input') as HTMLInputElement;
    
      fromEvent(searchInput, 'input')
        .pipe(
          debounceTime(250),
          map((event: Event) => (event.target as HTMLInputElement).value),
          distinctUntilChanged()
        )
        .subscribe(query => {
          this.search(query);
          this.showPagination = this.searchQuery.length === 0 || this.searchedMovies.length > 10;
        });

        this.preventBackButton();
       
    }


    private preventBackButton(): void {
      history.pushState(null, document.title, location.href);
      window.addEventListener('popstate', () => {
        history.pushState(null, document.title, location.href);
      });
    }

 
  fetchMovieData() {
    const apiUrl = `https://demo.credy.in/api/v1/maya/movies/?page=${encodeURIComponent(this.currentPage)}`;
     

      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Add the Authorization header to the GET request
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      console.log(headers)

    this.http.get(apiUrl, { headers }).subscribe((res: any) => {
    this.movieList = res.results;
    this.apiError = false; // Reset the API error status
    },  
    
    (error: any) => {

      console.error('An error occurred while fetching movies:', error);

      alert ("An error occurred while fetching movies. Please click the refresh button " +  error.errorMessage)
      this.apiError = true; // Set the API error status to true
    });
  
  }
  
  getMovieImageUrl(movieTitle: string): string {
    const encodedTitle = encodeURIComponent(movieTitle);
    return `https://ui-avatars.com/api/?name=${encodedTitle}&color=fff&size=256&background=random&rounded=true`;
  }
  
  getModalMoviesImageUrl(movieTitle: string): string {
    const encodedTitle = encodeURIComponent(movieTitle);
    return `https://ui-avatars.com/api/?name=${encodedTitle}&background=random&size=70`;
  }
  
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchMovieData();
  }
  
  openModal(movie: any) {
    this.selectedMovie = movie;
  }

  search(query: string) {
    console.log("Query : " + query.length);
    // this.searchQuery = query.trim();
  
    if (this.searchQuery.length >= 3) {
      this.searchedMovies = this.movieList.filter((movie: any) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showPagination = this.searchedMovies.length > 10;
    } else {
      this.searchedMovies = [];
      this.showPagination = true;
    }
  }

 
}

  




