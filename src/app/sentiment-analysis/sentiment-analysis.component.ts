import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent implements OnInit {

  public comments: string = '';
  public sentiment: string = '';
  public isCommentAdded: boolean = false;
  public findComment: boolean = false;
  public ticketText: string = '';
  public ticketID: number = 12937;
  public customer: string = '';
  public hasTicket: boolean = false;
  
  @ViewChild('socialwatcher') socialwatcher: any;
  @ViewChild('sentimentanalysis') sentimentanalysis: any;
  @ViewChild('ticketcreation') ticketcreation: any;
  constructor(public service: MasterService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.localStorageParser();
    }, 1000)
  }

  localStorageParser() {
    const comments = localStorage.getItem('comments');
    if (comments) {
      const parsedComments = JSON.parse(comments);
      this.comments = parsedComments.comments;
      this.sentiment = parsedComments.sentiment;
      this.isCommentAdded = parsedComments.isCommentAdded;
      this.findComment = parsedComments.findComment;
      this.ticketText = parsedComments.ticketText;
      this.ticketID = parsedComments.ticketID;
      this.hasTicket = parsedComments.hasTicket;
      if (this.socialwatcher && parsedComments.socialMode) {
        this.socialwatcher.mode = parsedComments.socialMode;
      }
      if (this.sentimentanalysis && parsedComments.sentimentMode) {
        this.sentimentanalysis.mode = parsedComments.sentimentMode;
      }
      if (this.ticketcreation && parsedComments.ticketMode) {
        this.ticketcreation.mode = parsedComments.ticketMode;
      }
    }
  }

}
