import { Component } from '@angular/core';
import { StuffService } from 'src/app/services/stuff.service';
import { MyStuff} from 'src/app/models/Stuffs';
import { DataService } from 'src/app/services/data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-stuffs',
  templateUrl: './stuffs.component.html',
  styleUrls: ['./stuffs.component.css']
})
export class StuffsComponent  {
  allstuffs: MyStuff[] = [];
  loginData ={email:'', token:''}
 
  constructor(
    private stuffService: StuffService,
    private data: DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
      this.spinner.show()
       setTimeout( ()=>{this.data.updateActiveNav('Home') }, 1);
    this.data.share.subscribe((x: any) => this.loginData = x)
      this.stuffService.getStuffs().subscribe((info) => {
        this.allstuffs = info;
        this.data.updateStuffData(info)
      });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

  }





}
