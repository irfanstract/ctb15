

import * as util from "src/projects/svp/util" ;













import type { 
  SupportedCaDesc, 
  SupportedCaDescTable ,
  SupportedCaType ,
  CaBaseOps ,
  default as allRenderers ,
} from "src/projects/svp/content-adapters/main";  

export type XAppProps = {
  transform: string ; 
  childItems: SupportedCaDesc[] ;
} ;

import {
  HoverListeningComp as HoverMnComp ,
} from "src/projects/svp/pointerEventHandling" ;

export const useXHoverState = (
  (() => {
    const [hoverPos, setHoverPos] = (
      util.React.useState<{ x: number ; y: number ; } | false>(false)
    ) ;
    return {
      hoverPos ,
      setHoverPos ,
    } ;
  }) satisfies (() => {})
) ;

export const R : MainOps["render"] = (
  (...[
    { transform, childItems, } ,
  ]) => {
    const Kk = util.React.Fragment ;
    ;
    const {
      hoverPos ,
      setHoverPos ,
    } = useXHoverState() ;
    ;
    const childItemsRendered = (
      childItems
      .map((c, index) => (
        <Kk key={index } >
          { renderEditorForCa(c) }
        </Kk>
      ) )
    ) ;
    const sSpec = (
      DOMMatrix.fromMatrix((
        JSON.parse(transform)
      ))
    ) ;
    ;
    const contentsLayer = (
      <g children={childItemsRendered } />
    ) ;
    const hoverLayer = (
      <g>
      <HoverMnComp 
      onPointerLeave={() => setHoverPos(false) }
      onPointerMoveRelative={evt => setHoverPos(evt.newPos ) }
      />
      { hoverPos && (
      <g style={{ pointerEvents: "none", }}>
        <path d={`M ${hoverPos.x} -1000 V 1000 z` } stroke="black" strokeWidth={1} />
        <path d={`M -1000 ${hoverPos.y} H 1000 z` } stroke="black" strokeWidth={1} />
      </g>
      ) }
      </g>
    ) ;
    return (
      <g
      transform={util.toCssTransformsString(sSpec) }
      >
        { contentsLayer }
        { hoverLayer }
      </g>
    ) ;
  }
) ;

export const main = (
  ({
    render: R ,
    Props: (
      util.Constructor.getNonFunctionalInstance()
    ) ,
  }) satisfies MainOps
) ;
interface MainOps extends CaBaseOps {
  Props: (
    util.Constructor.AtContravar<XAppProps>
  ) ;
};

import { 
  renderEditorForCa ,
} from "src/projects/svp/content-adapters/main"; 





















export {} ; // TS-1208
