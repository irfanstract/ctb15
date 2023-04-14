









export type FreePick<T, K> = (
  { [P in (K & keyof T)]: T[P]; }
) ;
export type ConstrainedPick<T, K extends keyof T> = (
  { [P in K]: T[P]; }
) ;

export type FreeOmit<T, K extends string | number | symbol> = (
  Omit<T, K>
) ;
export type ConstrainedOmit<T, K extends keyof T> = (
  Omit<T, K>
) ;



















export {} ; // TS(1208)
