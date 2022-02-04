export class updateUserDto {

    
    readonly firstName : String;
    readonly lastName : String;
    readonly birthDate : Date;
    readonly address : String;
    profileImg :  {
        fileName : String , 
        url : String
    };
}
