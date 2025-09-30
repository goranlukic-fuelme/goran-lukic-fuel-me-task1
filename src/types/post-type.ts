import { Comment } from "./comment-type";

export interface Post {
    userId: number;
    id: number;
    title:string;
    body:string;
    comments?:Comment[];
}