import { createLogger } from "./utils/create-logger";
import { User } from "./types/user-type";
import { fetchData } from "./utils/fetch-data";
import { Post } from "./types/post-type";
import { UserPost, UserWithPost} from "./types/userwithpost-type";

export class ReportGenerator {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private logFetching = createLogger('DataFetching');
  private logProcessing = createLogger('Processing');
  private defaultError = 'Unknown error';

  private async fetchUsers() : Promise<User[]> {
    try {
      const users = await fetchData<User[]>(this.usersUrl);
      this.logFetching(`Fetched ${users?.length} users`);
      return users;
    } catch (error) {
      this.logFetching(`Error fetching users: ${(error as Error).message || this.defaultError}`);
      throw error;
    }
  }

  private async fetchPosts() : Promise<Post[]> {
   try {
      const posts = await fetchData<Post[]>(this.postsUrl);
      this.logFetching(`Fetched ${posts?.length} posts`);
      return posts;
    } catch (error) {
      this.logFetching(`Error fetching posts: ${(error as Error).message || this.defaultError}`);
      throw error;
    }
  }

  public async generateReport() : Promise<UserWithPost[]> {
    try {
      this.logProcessing('Start generating report');
      const [users,posts] = await Promise.all([this.fetchUsers(),this.fetchPosts()]);

      this.logProcessing('Aggregating posts to user');

      const postsByUser = new Map<number,UserPost[]>();

      for(const post of posts){
        const {userId, ...userPost} = post;
        const postsArray = postsByUser.get(userId); 
        if(postsArray) {
          postsArray.push(userPost);
        }else{
          postsByUser.set(userId, [userPost]);
        }
      }

      const results : UserWithPost[] = users?.map((user)=>({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        posts: postsByUser.get(user.id) ?? [],
      }));

      return results;
    } catch (error) {
      this.logProcessing(`Error generating report: ${(error as Error).message || this.defaultError}`);
      throw error;
    }
  }
}