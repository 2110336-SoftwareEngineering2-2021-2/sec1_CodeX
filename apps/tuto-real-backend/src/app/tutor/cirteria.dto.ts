export class CriteriaDto {
  keyword : [String];
  rate : 
  {  min :  Number,
    max : Number
  };
  subjects : [String];
  days : [String]
  
  constructor(){
    this.rate = {min:0,max:10000}
  }
  
  }
  