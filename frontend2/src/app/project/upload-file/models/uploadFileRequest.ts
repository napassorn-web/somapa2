export interface uploadFileRequest {
    flightNo: string;
    file: {
        file: File;
        name: string;
        size: number;
        type: string;
    }
}