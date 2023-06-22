import { Component, ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent  {
 

  username:any;
  password:any;
  private jsonData:any;
  errorMessage: string = '';
  isLoading: boolean = false;

  responseUsername: string = ''; // Added variable to store response username
  responsePassword: string = ''; // Added variable to store response password
 

  constructor(private http:HttpClient, private router:Router){}

  ngOnInit(): void {
    this.username= 'testuser',
    this.password= 'v^4!C%CQ94f0'


  
  }

  // login(): void {
  //   if (!this.username || !this.password) {
  //     this.errorMessage = 'Please enter both username and password.';
  //     alert(this.errorMessage)
  //     return;
  //   }

  //   const loginUrl = 'https://dummyjson.com/users';
  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   this.http.get(loginUrl).subscribe(
  //     (res: any) => {
  //       console.log(res.users);
  //       this.jsonData = res.users;

  //       const user = this.jsonData.find(
  //         (u: any) => u.username === this.username && u.password === this.password
  //       );

  //       if (user) {
  //         // Store token in local storage
  //         const token = '<Token to be sent for authentication of future requests>';
  //         localStorage.setItem('token', token);

  //         // Redirect to movies page
  //         this.router.navigate(['/moviesPage']);
  //         alert("Login Successful..!!")
        


  //       } else {
  //         this.errorMessage = 'Invalid username or password.';

  //         alert(this.errorMessage)
          

  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = 'An error occurred while logging in. Please try again.';
  //       alert(this.errorMessage)
  //     }
  //   ).add(() => {
  //     this.isLoading = false;
  //   });
  // }




// }



login(): void {
  if (!this.username || !this.password) {
    this.errorMessage = 'Please enter both username and password.';
    alert(this.errorMessage);
    return;
  }

  const loginUrl = 'https://demo.credy.in/api/v1/usermodule/login/';
  const requestBody = {
    username: this.username,
    password: this.password
  };

  this.http.post(loginUrl, requestBody).subscribe(
    (res: any) => {
    
      console.log('API response:', res);

         // Extract the token from the response
         const token = res.data.token;

         // Store the token in local storage
         localStorage.setItem('token', token);


      // Redirect to movies page
      this.router.navigate(['/moviesPage']);
      alert('Login Successful..!!');
    },
    (error) => {
      this.errorMessage = 'An error occurred while logging in. Please try again.';
      alert(this.errorMessage);
    }
  );
}




onEnterKeyPress(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault();
    this.login();
  }
}
}




