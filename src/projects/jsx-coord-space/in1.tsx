

import * as util from "src/projects/svp/util" ;

























/** 
 * usage must make its `children` a function rather than regular return-value ;
 * the dispatch of the function 
 * will receive a callback like `translateClientPos` developers expected for
 * 
 */
export const WithLocalCoordSpaceUsageComp = (() => {
  const byRefed = (
    (refed1: SVGGraphicsElement) => {
      return {

        getScreenCtm: () => (
          refed1.getScreenCTM()
        ) ,
  
        /** 
         * translate given client point - what {@link PointerEvent} normally gives -
         * into the equivalent point in the local coord space
         * 
         */
        translateClientPos: (p0: DOMPointReadOnly | (PointerEvent | MouseEvent)): DOMPointReadOnly => {
          const sctm = (
            refed1.getScreenCTM()
          ) ;
          if (sctm) {
            const p = (
              (p0 instanceof PointerEvent || p0 instanceof MouseEvent) ?
              DOMPointReadOnly.fromPoint({
                x: p0.clientX ,
                y: p0.clientY ,
              })
              : p0
            ) ;
            return (
              p
              .matrixTransform(sctm.inverse() )
            ) ;
          }
          /* return the point zero */
          return (
            DOMPointReadOnly.fromPoint({})
          ) ;
        } ,
        
      } ;
    }
  ) ;
  return (
    (...[{
      children: render ,
    }] : [
      { 
        children: {
          (ctx: ReturnType<typeof byRefed>): util.React.ReactElement ;
        } ; 
      } ,
    ] ): util.React.ReactElement => {
      const [refed1, updateRef1] = (
        util.React.useState<null | SVGGraphicsElement>(null)
      ) ;
      ;
      const ctx = (
        util.React.useMemo(() => (
          refed1 ?
          byRefed(refed1)
          : null
        ) , [refed1, ] )
      ) ;
      return (
        <g ref={updateRef1 } >
          { ctx && render(ctx) }
        </g>
      ) ;
    }
  ) ;
})() ;
























export {} ; // TS(1208)
