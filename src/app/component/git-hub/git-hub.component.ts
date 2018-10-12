import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../../service/git-hub.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-git-hub',
  templateUrl: './git-hub.component.html',
  styleUrls: ['./git-hub.component.css'],
  providers: [GitHubService]
})
export class GitHubComponent implements OnInit {
  user: any;
  myfindUser: any;
  repo: any [];
  myForm: FormGroup;

  constructor(private _gitHubService: GitHubService, private fb: FormBuilder) {
    console.log('GitHub Service init...');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]]
    });
    this._gitHubService.getUser().subscribe(users => {
      console.log(users);
      this.user = users;

    });
  }

  getRepos() {
    this._gitHubService
      .findUser(this.username.value)
      .subscribe(user => {
        this.myfindUser = user;
         this._gitHubService.getRepositories(this.myfindUser.login).subscribe(rep => { this.repo = rep; console.log(this.repo); });
      });
  }
  get username() {
    return this.myForm.get('username');
  }
  getUserGithub(uname: string) {}
}
