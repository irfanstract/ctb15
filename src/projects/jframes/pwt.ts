








export type MustSpecifyAll<P extends {}> = (
  P & Record<keyof P, unknown>
) ;

export type PickAll<P extends {}, Q> = (
  Pick<P, (keyof P) & Q>
) ;

;
/**
 * due to the resulting type-mismatch issues,
 * the `onYyy` handlers will need to be narrowed to the type conjunctions
 * 
 */
export type PropsWithoutConflicts<A0 extends { [k: string | number | symbol]: unknown ; }> = (
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
  { [k in (keyof A0) & {}] /* OBLIGE */ -?: (value: A0[k]) => void ; }
);

/** 
 * the reverse of {@link AsEachFromAcceptor} except being type-safe(er)
 * 
 */
export type AsEachFromAcceptor<A0 extends { [k: string | number | symbol]: (value: never) => unknown ; }> = (
  { [k in keyof A0]: AsEachFromAcceptorImpl<A0>[k] ; }
) ;
type AsEachFromAcceptorImpl<A0 extends { [k: string | number | symbol]: (value: never) => unknown ; }> = (
  { [k in (keyof A0) & {}] /* OBLIGE */ -?: (
    Parameters<A0[k]>[0]
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
    (...args: infer P4): any ; 
  }] ? (P1 | P2 | P3 | P4) : 
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

/** 
 * `A1 & A2 & A3` given `A1 | A2 | A3`
 * 
 * @deprecated
 * union-types representations can change depending on implementation, and in general
 * union-types present ambiguity in face of {@link Exclude distributivity}
 */
export type ConjunctionFromAlternation<A> = (
  (A extends (infer A1) ? { (value: A1): void ; } : never ) extends { (value: infer A2): unknown ; } ?
  A2 : never
) ;








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
type EPC = ({ value: 3 } | { value?: 4 }) extends infer C ? ({ [k1 in keyof C]: (...values: C[]) => void ; } ) : never ;
// [(arg) => {}, f => {} , ] satisfies [
//   PccTestFunctions1C["onClick"], 
//   (...args: Parameters<PccTestFunctions1C["onClick"]>) => void ,
// ] ;














export {} ; // TS(1208)
