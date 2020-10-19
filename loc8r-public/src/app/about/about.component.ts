import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public pageContent = {
    header: {
      title: 'about Loc8r',
      strapline: ''
    },
    content : 'Loc8r was created to help people find places to sit down and get a bit of  done.\n\nLorem ipsum dolor sitamet, consectetur adipiscing elit.Id tempor sint consectetur id magna officia velit commodo pariatur irure exercitation tempor. Deserunt magna aliqua qui occaecat qui quis veniam veniam cillum consectetur fugiat aute do officia. Proident magna tempor minim labore sit esse et et. Sint eu qui aliqua et Lorem. Amet quis voluptate exercitation fugiat velit ex. Ipsum do do qui nisi adipisicing mollit pariatur et esse enim aliqua est.'
  }
}
