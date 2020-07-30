
export default interface Comment{
    content: string;
    commentId?: number;
    userId: number;
    reviewId: number;
    likes?: number;
    date?: Date;
}
