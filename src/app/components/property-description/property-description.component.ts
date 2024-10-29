import { Component } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { CommentsComponent } from '../comments/comments.component';
import { HearderAuthComponent } from '../hearder-auth/hearder-auth.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-property-description',
  standalone: true,
  imports: [RatingComponent, CommentsComponent, FooterComponent, HearderAuthComponent],
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.css']
})
export class PropertyDescriptionComponent {

}
