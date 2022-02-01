
export class TutorReqDto {
    readonly  uid: String;
    evidenceImg: [{data : Buffer , name : String , type : String}];
    timeStamp : Date;
}
