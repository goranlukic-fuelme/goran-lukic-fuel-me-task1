export interface UserPost {
    id: number;
    title: string;
    body: string;
}

export interface UserWithPost {
    id: number;
    name: string;
    username: string;
    email:string;
    posts: UserPost[];
}