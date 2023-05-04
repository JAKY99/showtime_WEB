import {UserModel} from "../user/user-list-model";

export interface CommentModel {
  id: number,
  user: UserModel,
  content: string,
  movie_id: string
  validate: boolean
  spoiler: boolean
}

export interface CommentNoIdModel {
  user: UserModel,
  content: string,
  movie_id: string
  validate: boolean
  spoiler: boolean
}
