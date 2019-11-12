import {Blog} from './Blog';
import {User} from './User';

export interface UserComment {
  id: number;
  user: User;
  blog: Blog;
  comment: string;
  date: Date;
}
