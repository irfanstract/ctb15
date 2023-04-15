

import * as util from "src/projects/svp/util" ;













import type { 
  SupportedCaDesc, 
  SupportedCaDescTable ,
  SupportedCaType ,
  CaBaseOps ,
} from "src/projects/svp/content-adapters/main";  
 
export const R : MainOps["render"] = (...[
  { spec, } ,
] ) => {
  // TODO
  return (
    <path 
    d={spec }
    fill="blue"
    />
  ) ;
} ;

export const main = (
  ({
    render: R ,
    Props: (
      util.Constructor.getNonFunctionalInstance()
    ) ,
  }) satisfies MainOps
) ;
type MainOps = POps ;
/** 
 * the specialisation of {@link CaBaseOps} for `path`s.
 * 
 */
export interface POps extends CaBaseOps {
  Props: (
    util.Constructor.AtContravar<(
      & {
        spec: string ; 
      }
    )>
  ) ;
} ;





















export {} ; // TS-1208
