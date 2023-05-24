import { Component, ViewChild, OnInit } from '@angular/core';
import { MasterService } from './master.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'social-watcher';
  public comments: string = '';
  public sentiment: string = '';
  public isCommentAdded: boolean = false;
  public findComment: boolean = false;
  public ticketText: string = '';
  public ticketID: number = 12937;
  public socialMode: string = '';
  public sentimentMode: string = '';
  public ticketMode: string = '';
  public hasTicket: boolean = false;
  
  @ViewChild('socialwatcher') socialwatcher: any;
  @ViewChild('sentimentanalysis') sentimentanalysis: any;
  @ViewChild('ticketcreation') ticketcreation: any;

  constructor(public service: MasterService){}

  ngOnInit(): void {
    // localStorage.clear();
    this.service.isProgress = false;
  }

  setLocalStorag() {
    localStorage.setItem('comments', JSON.stringify({
      comments: this.comments,
      ticketText: this.ticketText,
      isCommentAdded: this.isCommentAdded,
      findComment: this.findComment,
      sentiment: this.sentiment,
      socialMode: this.socialMode,
      sentimentMode: this.sentimentMode,
      ticketMode: this.ticketMode,
      ticketID: this.ticketID,
      hasTicket: this.hasTicket
    }))
  }

  commentChanging() {
    this.ticketText = '';
    this.isCommentAdded = false;
    this.findComment = false;
    this.sentiment = '';
    this.socialMode = 'indeterminate';
    this.sentimentMode = 'indeterminate';
    this.ticketMode = 'indeterminate';
    // localStorage.clear();
    this.setLocalStorag();
  }

  onComment() {
    this.isCommentAdded = true;
    this.setLocalStorag();
    setTimeout(() => {
      this.findComment = true;
      this.socialMode = 'determinate';
      this.setLocalStorag();
      setTimeout(() => {
        const words = ["worst", "bad", "to lengthly", "slowness", "no body rember whole training", "isn't a lecture", "killing me", "is too lengthy"];
        let negativeWords = false;
        for (let i = 0; i < words.length; i++) {
          if (this.comments.toLowerCase().includes(words[i])) {
            negativeWords = true;
          }
        }
        // const negativeWords = this.comments.toLowerCase().match( /bad|worst|to lengthly|slowness|no body can remember whole training|isn't a lecture|UI experience of #AWSCertification killing me|Oh, no! #AWSCertification is too lengthy/g );
        this.sentiment = negativeWords ? 'Negative' : 'Positive';
        this.sentimentMode = 'determinate';
        this.setLocalStorag();
        setTimeout(() => {
          setTimeout(() => {
            let comments: any = localStorage.getItem('commentsText');
            comments = JSON.parse(comments);
            if (!comments)
              comments = {};
            if (!comments[this.comments]) {
              this.ticketText = 'unavailable';
              comments[this.comments] = 1;
              localStorage.setItem("commentsText", JSON.stringify(comments));
            } else {
              this.ticketText = 'available';
              comments[this.comments] = comments[this.comments] + 1;
              localStorage.setItem("commentsText", JSON.stringify(comments));
            }
            this.setLocalStorag();
            setTimeout(() => {
              if (this.ticketText == 'available') {
                this.ticketText = 'updated';
              } else {
                this.ticketText = 'created';
              }
              this.ticketMode = 'determinate';
              this.setLocalStorag();
            }, 4000);
          }, 2000);
        }, 4000);
      }, 4000);
    }, 4000);
  }
}
