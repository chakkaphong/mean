import { Component, OnInit, Input } from '@angular/core';
import { Location, Review } from '../location';
import { Loc8rDataService } from '../loc8r-data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;
  public googleAPIKEY: string = 'AIzaSyATlvbVyy2Djy4buxmpXS-WJqQf-pVz3cM';
  constructor(private loc8rDataService : Loc8rDataService) { }
  public formVisible: boolean = false;
  public newReview = {
    author: '',
    rating: 5,
    reviewText:''
  };
  public formError: string;
  private formIsValid(): boolean{
    if(this.newReview.author && this.newReview.rating && this.newReview.reviewText) return true;
    return false;
  }
  public onReviewSubmit(): void{
    this.formError = '';
    if(this.formIsValid()){
      console.log(this.newReview);
      this.loc8rDataService.addReviewByLocationId(this.location._id, this.newReview)
      .then((review: Review)=>{
        console.log('review saved', review);
        let reviews = this.location.reviews.slice(0);
        reviews.unshift(review);
        this.location.reviews = reviews;
        this.resetAndHideReviewForm();
      });
    }else{
      this.formError = 'All fields required , please ty again';
    }
  };
  private resetAndHideReviewForm(): void{
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }


  ngOnInit(): void {
  }

}
