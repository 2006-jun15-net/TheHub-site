import User from './user';
export default interface Comment{
    Content: string,
    CommentId?: number,
    UserId: number,
    ReviewId: number,
    Likes?: number,
    Likers?: User[],
    Date?: Date
}