
import _ from "lodash" ;
import "core-js/actual" ;
// import "core-js/full" ;
import "core-js/proposals/map-upsert-stage-2" ;





/* Blink/Chr Bug Fix */
for (const methodName of ["getScreenCTM", "getCTM"] as const) {
  const originalImpl = (
    SVGGraphicsElement.prototype[methodName]
  ) ;
  SVGGraphicsElement.prototype[methodName] = (
    function (this: SVGGraphicsElement, ...args ) {
      const originalReturnVal = (
        originalImpl.apply(this, ...args) as 
        (SVGMatrix | DOMMatrix )
      ) ;
      const newReturnVal = (
        // TODO
        DOMMatrix.fromMatrix((
          originalReturnVal
        ))
      ) satisfies DOMMatrix ;
      return (
        newReturnVal
      ) ;
    }
  ) ;
} ;





export const FIVE: 5 = 5 ;

export {} ; // TS(1208)

