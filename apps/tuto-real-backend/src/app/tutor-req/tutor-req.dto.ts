
export class TutorReqDto {
    readonly  email: String;
    evidenceImg: {
        fileName : String , 
        url : String
    }[];
    timeStamp : Date;
}
