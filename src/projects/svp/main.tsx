

import * as util from "src/utility-functions/all" ;









export default (
  util.React.forwardRef<{}, {}>(function SvpRender() {
    return (
      <svg 
      className={`SvpMain ` }
      viewBox={`0 0 500 250 `}
      style={{
      }}
      children={(
        <HoverMnComp />
      )}
      />
    ) ;
  })
) ;
const HoverMnComp = (
  util.React.forwardRef<{}, {}>(function SvpRender() {
    const [pos, setPos] = (
      util.React.useState<{ x: number ; y: number ; } | false>(false)
    ) ;
    const [e, setE] = (
      util.React.useState<SVGElement | false>(false)
    ) ;
    const onMouseExitImpl = (
      () => {
        setPos(false) ;
        ;
      }
    ) ;
    const handlePointerMovement = (
      (evt => {
        evt.currentTarget.childNodes ;
        setE(evt.currentTarget ?? false) ;
        const ctm = (
          getCtmImpl(evt.currentTarget, "getScreenCTM")
        ) ;
        const m1 = (
          DOMPoint.fromPoint({ x: evt.clientX, y: evt.clientY, })
        ) ;
        const m2 = m1.matrixTransform(DOMMatrix.fromMatrix(ctm).inverse() ) ;
        setPos({ x: m2.x, y: m2.y, }) ;
        ;
      }) satisfies util.React.Dispatch<util.React.PointerEvent<SVGGraphicsElement> >
    ) ;
    return (
      <g 
      onPointerDown={(evt) => {
        console["info"](TypeError(`mousedown detected`) ) ;
        if (1) {
          ;
          1 && console["log"](`pos: `, pos, ) ;
          0 && console["log"](`e: `, e, (e instanceof SVGGraphicsElement) && getCtmImpl(e, "getScreenCTM"), ) ;
          1 && console["log"](`client-pos: `, { x: evt.clientX, y: evt.clientY, }, ) ;
          ;
        }
      } }
      onPointerLeave={e => onMouseExitImpl() }
      onPointerMove={evt => (
        handlePointerMovement(evt)
      ) }
      style={{
      }}
      children={(
        <circle
        cx={0} cy={0} 
        r={1920}
        fill={(
          // `rgba(64, 64, 64, ${0})`
          "transparent"
        )}
        />
      )}
      />
    ) ;
  })
) ;

/** 
 * {@link SVGGraphicsElement.getScreenCTM } or 
 * {@link SVGGraphicsElement.getCTM }
 * 
 */
const getCtmImpl = (
  ((...[target, methodName]): DOMMatrix => (
    ( (target instanceof SVGGraphicsElement) && target[methodName]() )
    || DOMMatrix.fromMatrix({})
  )) satisfies {
    (...args: [
      receiver: Element, 
      mode: keyof Pick<SVGGraphicsElement, "getScreenCTM" | "getCTM">
    ]): DOMMatrix ;
  }
) ;





































export {} ; // TS-1208
