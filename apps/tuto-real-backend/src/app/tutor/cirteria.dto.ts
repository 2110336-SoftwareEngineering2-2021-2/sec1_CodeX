import { ApiProperty } from "@nestjs/swagger";
import { StringDecoder } from "string_decoder";

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

export class CriteriaQuery{
  @ApiProperty({description: `Split each word with comma 
  , Any word that size < 3 will be ignored , Search in firstName lastName and description of both tutor and slot
  with case-insensitive`,
    required : false})
  keyword : String;

  @ApiProperty({description: `Split with comma : 'min,max' if no maximum just : 'min'`,
    required : false })
  rate : String;

  @ApiProperty({description: `Split each subject with comma`,
    required : false})
  subjects :String;
  
  @ApiProperty({description: `Split each day with comma`,
    required : false})
  days : String
  
}

export class profileImg{
  @ApiProperty()
  url : String

  @ApiProperty()
  _id : String
}
export class nestedData{
  
  @ApiProperty()
    _id : String

    @ApiProperty()
    firstName : String

    @ApiProperty()
    lastName : String

    @ApiProperty({type:()=>profileImg})
    profileImg :{
      url : String,
      _id : String
    }
    
    @ApiProperty()
    subjects : [String]
    @ApiProperty()
    price : Number;

    @ApiProperty()
    rating : Number
  
}

export class resultDto{
  @ApiProperty()
  success : Boolean;

  @ApiProperty({type:()=>[nestedData]})
  data : nestedData
  
}

