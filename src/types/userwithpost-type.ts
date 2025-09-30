import { Post } from "./post-type";

export interface UserWithPost {
    id: number;
    name: string;
    username: string;
    email:string;
    posts: Post[];
}