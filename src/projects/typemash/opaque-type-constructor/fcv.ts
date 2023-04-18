




import * as util from "src/utility-functions/all" ;






namespace Constructor {
  
  export type AtContravar<in A > = ({ set(v: A): unknown ; }) ;
  export type AtCovar    <out A> = ({ get(): A ;           }) ;

  export type ContravarZero = (AtContravar<never>) ;
  export type CovarZero     = (AtCovar<unknown>  ) ;
  
  ;
  /** 
   * this `type def` shall extract info(s) from the given "constructor".
   * 
   */
  export type Tv<Desc extends {}> = (
    & { value   : (Desc & unknown) extends AtCovar<infer T>     ? T : (unknown) ; }
    & { newValue: (Desc & unknown) extends AtContravar<infer T> ? T : (never  ) ; }
  ) ;

  export const getNonFunctionalInstance : {
    <A extends {} = never>(): AtCovar<A> & AtContravar<A> ;
  } = (
    () => ({
      get () { throw TypeError(`illegal constructor.`) ; } ,
      set () { throw TypeError(`illegal setter.`) ; } ,
    })
  ) ;

  ; // TS(1205)
} ;







export default Constructor ;



















export {} ; // TS(1208)
