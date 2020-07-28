import User from './user';
export default interface Review{
    ReviewId?: number,
    ReviewDate?: Date, 
    Likes?: number,
    Rating: number,
    comments?: string[],
    Likers?: User[],
    content: string
}