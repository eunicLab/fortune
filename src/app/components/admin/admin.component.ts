import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StuffService } from 'src/app/services/stuff.service';
import { MyStuff } from 'src/app/models/Stuffs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

 

  
  title: string = '';
  price: number = 0;
  imageUrl: string = '';
  description: string = '';
  error = { errorMessage: '', errorType: '' };
  allstuffs:MyStuff[]=[];
  editable = ['false'];
  update = ['Update'];
  loginData = { email: '', token: '', admin:false }
  view = "";


  constructor(
    private stuffService: StuffService,
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
       setTimeout( ()=>{this.data.updateActiveNav('Admin') }, 1);
    this.data.share.subscribe((x: any) => this.loginData = x)
    this.data.shareStuffData.subscribe((x: any) => this.allstuffs = x)
    this.update = new Array(this.allstuffs.length).fill('Update');
    this.editable = new Array(this.allstuffs.length).fill('false')   
  }



  
   deleteStuff(deleteId: string|undefined) {
     this.stuffService.deleteStuff(deleteId, this.loginData.token).subscribe(async data => {
      await  this.stuffService.getStuffs().subscribe((info) => {
              this.allstuffs = info;
              this.data.updateStuffData(info)
        }); 
     });
     
   }
  

  onView(imageUrl:any) {
    this.view=imageUrl
  }
  
  goToLogin() {
    this.router.navigateByUrl('/Login')
  }
  
  updateClicked(stuff: MyStuff, index: number, event: any){
    event.stopPropagation();
    if (this.update[index] === 'Update') {
      this.update[index] = 'Save';
      this.editable[index] = 'true';
    }
    else {
        let title = document.getElementById(`title${index}`);
        let imageUrl = document.getElementById(`imageUrl${index}`);
        let price= document.getElementById(`price${index}`);
        let description = document.getElementById(`description${index}`);
        if (title?.innerHTML !== '') {
        if (imageUrl?.innerHTML !== '') {
        if (Number(price?.innerHTML) !== 0) {
        if (description?.innerHTML !== '') {
          this.update[index] = 'Update';
          this.editable[index] = 'false';
        
          let item:MyStuff = {
              _id:stuff._id,
              title: title?.innerHTML,
              price: Number(price?.innerHTML),
              description: description?.innerHTML,
              imageUrl: imageUrl?.innerHTML,
              email:this.loginData.email
            };
          this.stuffService.updateStuff(item, this.loginData.token).subscribe(async data => {
            await  this.stuffService.getStuffs().subscribe((info) => {
                    this.allstuffs = info;
                    this.data.updateStuffData(info)
        });
          });
    
        }
         else {
        this.error = {
          errorMessage: 'Please provide the description of the product',
          errorType: 'description'
        };
      }
         }
         else {
          this.error = {
            errorMessage: 'Please provide the price of the product',
            errorType: 'price'
          };
        }
       
      }
      
      else {
            this.error = {
              errorMessage: 'Please provide an image url for the product',
              errorType: 'imageUrl'
            };
          }
        }
      
      else {
      this.error = {
        errorMessage: 'Please provide the title of the product',
        errorType: 'title'
      }
    }
  }
  }
  

  addoneProduct(oneitem: any) {
    this.stuffService.addStuff(oneitem,this.loginData.token).subscribe(async data => {
      console.log(data);
      await  this.stuffService.getStuffs().subscribe((info) => {
            this.allstuffs = info;
             this.data.updateStuffData(info)
        });
    }); 
  }
   

  addItem() {
    if (this.title !== '') {
    if (this.imageUrl !== '') {
    if (this.price !== 0) {
    if (this.description !== '') {
            const newItem = {
              title: this.title,
              price: this.price,
              description: this.description,
              imageUrl: this.imageUrl,
              email:this.loginData.email
            };
            this.addoneProduct(newItem);
            this.title = '',
              this.price = 0,
              this.description = '',
              this.imageUrl = ''
            this.error = { errorMessage: '', errorType: '' };
          }  else {
        this.error = {
          errorMessage: 'Please provide the description of the product',
          errorType: 'description'
        };
      }
         }
         else {
          this.error = {
            errorMessage: 'Please provide the price of the product',
            errorType: 'price'
          };
        }
       
      }
      
      else {
            this.error = {
              errorMessage: 'Please provide an image url for the product',
              errorType: 'imageUrl'
            };
          }
        }
      
      else {
      this.error = {
        errorMessage: 'Please provide the title of the product',
        errorType: 'title'
      }
    }
  }
}