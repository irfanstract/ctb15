

import * as util from "src/projects/svp/util" ;













import type { 
  SupportedCaDesc, 
  SupportedCaDescTable ,
  SupportedCaType ,
  CaBaseOps ,
  EntryInstCtx ,
} from "src/projects/svp/content-adapters/main";  
 
export const main = (
  (...[{
    renderEditorForItem ,
  }] : [EntryInstCtx,] ) => {
    const R : MainOps["render"] = (...[
      { 
        spec: pathData, 
        onChange: propagateChangeEvt = Array.of ,
      } ,
    ] ) => {
      // TODO
      return (
        <g
        onPointerDown={() => {
          propagateChangeEvt({
            newValue: {
              spec: `M 200 200 h 32 v 32 h -32 z` ,
            } ,
          }) ;
        } }
        >
        <path 
        d={pathData }
        fill="none"
        stroke="black"
        strokeWidth={3 }
        />
        </g>
      ) ;
    } ;
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
/** 
 * the specialisation of {@link CaBaseOps} for `path`s.
 * 
 */
export interface MainOps extends CaBaseOps {
  ContentProps: (
    util.Constructor.AtContravar<(
      & {
        spec: string ; 
      }
    )>
  ) ;
} ;





















export {} ; // TS-1208
