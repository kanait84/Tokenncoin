import {Component, Injectable, OnInit} from '@angular/core';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class LandingComponent implements OnInit {
  constructor( ) { }
  ngOnInit() {
  }
}
