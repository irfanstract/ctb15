

import * as util from "src/projects/svp/util" ;













import type { 
  SupportedCaDesc, 
  SupportedCaDescTable ,
  SupportedCaType ,
  CaBaseOps ,
  EntryInstCtx ,
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

export const main = (
  (...[{
    renderEditorForItem: renderEditorForCa ,
  }] : [EntryInstCtx, ] ) => {
    const R : MainOps["render"] = (
      (...[
        { 
          transform: mTransform, 
          childItems: mChildren, 
        } ,
      ]) => {
        const Kk = util.React.Fragment ;
        ;
        ;
        const mChildrenRendered = (
          mChildren
          .map((c, index) => (
            <Kk key={index } >
              { renderEditorForCa(c) }
            </Kk>
          ) )
        ) ;
        const mTransformAttrParsed = (
          DOMMatrix.fromMatrix((
            JSON.parse(mTransform)
          ))
        ) ;
        ;
        return (
          (() => {
            const contentsLayer = (
              <g children={mChildrenRendered } />
            ) ;
            const hoverLayer = (
              <g>
              </g>
            ) ;
            return (
              <g
              transform={util.toCssTransformsString(mTransformAttrParsed) }
              >
                { contentsLayer }
                { hoverLayer }
              </g>
            ) ;
          })()
        ) ;
      }
    ) ;
    return (
      ({
        render: R ,
        ContentProps: (
          util.Constructor.getNonFunctionalInstance()
        ) ,
      }) satisfies MainOps
    ) ;
  }
) ;
interface MainOps extends CaBaseOps {
  ContentProps: (
    util.Constructor.AtContravar<XAppProps>
  ) ;
};





















export {} ; // TS-1208
