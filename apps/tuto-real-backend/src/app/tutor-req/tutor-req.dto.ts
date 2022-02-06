
export class TutorReqDto {
    firstName : String;
    lastName : String;
    readonly  email: String;
    citizenID: {
        fileName : String , 
        url : String
    };
    transcription : {
        fileName : String , 
        url : String
    };
    timeStamp : Date;
    citizenID64 : String;
    transcription64 : String;
}