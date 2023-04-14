

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
        <path 
        d={pathData }
        fill="blue"
        />
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
