

import * as util from "src/utility-functions/all" ;












export type Titleable = Partial<TitleableTp> ;
interface TitleableTp {
  title: string ;
}

export type CommiteeDesc = Partial<CommiteeDescTp> ;
export interface CommiteeDescTp extends TitleableTp {}

export type TaskDesc = Partial<TaskDescTp> ;
export interface TaskDescTp extends TitleableTp {}
export interface TaskDescTp {
  assignees: CommiteeDesc[] ;
  done : boolean ;
}



















export {} ; // TS-1208
