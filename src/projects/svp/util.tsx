




import * as util from "src/utility-functions/all" ;


export * from "src/utility-functions/all" ;
export { default as Constructor, } from "src/projects/typemash/opaque-type-constructor/fcv" ;


export const toCssTransformsString = (
  ((...[sSpec]) => {
    const sSpecFmt = (
      (["a", "b", "c", "d", "e", "f"] as const)
      .map(key => sSpec[key] )
    ) ; 
    return `matrix(${sSpecFmt.join(", ") }) ` ;
  }) satisfies { (spec: DOMMatrixReadOnly): string ; }
) ;




















export {} ; // TS(1208)
