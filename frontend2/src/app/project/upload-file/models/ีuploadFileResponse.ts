import { data } from "./data";

export interface uploadFileResponse {
    messageCode: number;
    messageDesc: string;
    data: data[];
}