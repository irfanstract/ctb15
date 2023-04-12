








export type ConjunctionFromAlternation<A> = (
  (A extends (infer A1) ? { (value: A1): void ; } : never ) extends { (value: infer A2): unknown ; } ?
  A2 : never
) ;

;
/**
 * due to the resulting type-mismatch issues,
 * the `onYyy` handlers will need to be narrowed to the type conjunctions
 * 
 */
export type PropsWithoutConflicts<A0 extends { [k: string | number | symbol]: unknown ; }> = (
  // AsEachFromAcceptor<(
  //   AsEachAsAcceptor<A0>
  // )>
  ConjunctionFromAlternation<A0>
) ;
/** 
 * with each property `bar: V` become `bar: (value: V) => void`
 * 
 */
export type AsEachAsAcceptor<A0> = (
  { [k in keyof A0]: AsEachAsAcceptorImpl<A0>[k] ; }
);
export type AsEachAsAcceptorImpl<A0> = (
  // A0 extends infer A extends { [k: string | number | symbol]: unknown ; } ? (
  //   [(keyof A) & {}] extends [infer AKey extends string | number | symbol] ?
  //   { [k in AKey] -?: [A[k] extends infer P ? ((value: P) => void) : never] extends [infer PV extends ((v: never) => void)] ? PV : never ; }
  //   : never
  // ) : never
  { [k in (keyof A0) & {}] /* REQUIRED */ -?: (value: A0[k]) => void ; }
);

/** 
 * the reverse of {@link AsEachFromAcceptor} except being type-safe(er)
 * 
 */
export type AsEachFromAcceptor<A0 extends { [k: string | number | symbol]: (value: never) => unknown ; }> = (
  { [k in keyof A0]: AsEachFromAcceptorImpl<A0>[k] ; }
) ;
type AsEachFromAcceptorImpl<A0 extends { [k: string | number | symbol]: (value: never) => unknown ; }> = (
  { [k in (keyof A0) & {}] -?: (
    Parameters<A0[k]>[0]
    // Parameters<A0[k]>
    // A0[k]
  ) ; }
) ;

/** 
 * the safe one
 * 
 */
export type Parameters<T extends (...args: any) => any> = (
  [T] extends [{ 
    (...args: infer P1): any ; 
    (...args: infer P2): any ; 
    (...args: infer P3): any ; 
  }] ? (P1 | P2 | P3) : 
  [T] extends [{ 
    (...args: infer P1): any ; 
    (...args: infer P2): any ; 
  }] ? (P1 | P2) : 
  [T] extends [{ (...args: infer P): any ; }] ? P : 
  never
) ;
type Ptt = ([x ?: string] & [x ?: number]) ;
[] satisfies Ptt;
type PttF = ([x ?: (id: number) => void] & [x ?: (id: string) => void]) ;
[(ident) => {}, ] satisfies PttF;



type PccTest0 = (
  AsEachFromAcceptor<(
    AsEachAsAcceptor<{ s: string | number ; } | { s: string | boolean ; }>
  )>
);
type PccTest1 = (
  (
    AsEachAsAcceptorImpl<{ s: string | number ; } | { s: string | boolean ; }>
  )
);
type PccTest11 = (
  (
    AsEachAsAcceptor<{ s: string | number ; } | { s: string | boolean ; }>
  )
);
type PccTest111 = PccTest11["s"] ;
type PccTest1111 = Parameters<PccTest111> ;
type PccTestFunctionsExtracted0 = (
  {
    onClick: { (s: string): void ; } & { (s: number): void ; } ;
  }["onClick"]
) ;
type PccTestFunctionsExtracted = (
  AsEachFromAcceptor<{
    onClick: { (s: string): void ; } & { (s: number): void ; } ;
  }>
) ;
type PccTestFunctions = (
  (
    AsEachAsAcceptor<(
      | { onClick: (evt: string) => void ; } 
      | { onClick: (evt: number) => void ; }
    )>
  )
);
type PccTestFunctions1 = (
  PccTestFunctions["onClick"]
) ;
type PccTestFunctions1A = (
  Parameters<PccTestFunctions1 >[0]
) ;
[(arg) => {},] satisfies [PccTestFunctions1A] ;
type PccTestFunctions1C = (
  AsEachFromAcceptor<PccTestFunctions>
) ;
// [(arg) => {}, f => {} , ] satisfies [
//   PccTestFunctions1C["onClick"], 
//   (...args: Parameters<PccTestFunctions1C["onClick"]>) => void ,
// ] ;














export {} ; // TS(1208)
