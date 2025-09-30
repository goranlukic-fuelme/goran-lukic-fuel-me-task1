import { createLogger } from "./utils/create-logger";
import { User } from "./types/user-type";
import { fetchData } from "./utils/fetch-data";
import { Post } from "./types/post-type";
import { UserWithPost} from "./types/userwithpost-type";
import { Comment } from "./types/comment-type";

export class ReportGenerator {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentUrl = 'https://jsonplaceholder.typicode.com/comments';
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

  private async fetchComments() : Promise<Comment[]> {
   try {
      const comments = await fetchData<Comment[]>(this.commentUrl);
      this.logFetching(`Fetched ${comments?.length} comments`);
      return comments;
    } catch (error) {
      this.logFetching(`Error fetching posts: ${(error as Error).message || this.defaultError}`);
      throw error;
    }
  }

  public async generateReport() : Promise<UserWithPost[]> {
    try {
      this.logProcessing('Start generating report');
      const [users,posts,comments] = await Promise.all([this.fetchUsers(),this.fetchPosts(),this.fetchComments()]);


      const commentsInPosts = new Map<number,Comment[]>();
      const postsByUser = new Map<number,Post[]>();

      this.logProcessing('Aggregating comments to post');

      for(const comment of comments){
        const {postId,} = comment;
        const commentsArray = commentsInPosts.get(postId); 
        if(commentsArray) {
          commentsArray.push(comment);
        }else{
          commentsInPosts.set(postId, [comment]);
        }
      }
      
      this.logProcessing('Aggregating posts to user');

      for(const post of posts){
        const {userId,id:postId} = post;
        const commentsByPost = commentsInPosts.get(postId);
        post.comments = commentsByPost ?? [];
        const postsArray = postsByUser.get(userId); 
        if(postsArray) {
          postsArray.push(post);
        }else{
          postsByUser.set(userId, [post]);
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