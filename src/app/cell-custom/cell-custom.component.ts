import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit {
  data:any;
  params:any;
  constructor(private router:Router) { }

  agInit(params){
    this.params=params;
    this.data=params.value;
  }

  ngOnInit(): void {
  }

  edit(){
    this.router.navigate(['createTraining',this.params.data.id]);
  }
}