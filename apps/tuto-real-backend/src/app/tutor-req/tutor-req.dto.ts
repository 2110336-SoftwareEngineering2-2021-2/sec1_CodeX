
export class TutorReqDto {
    readonly  uid: String;
    evidenceImg: {
        fileName : String , 
        url : String
    }[];
    timeStamp : Date;
}
