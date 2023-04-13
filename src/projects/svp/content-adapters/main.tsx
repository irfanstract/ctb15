

import * as util from "src/projects/svp/util" ;










type SupportedCaProps = (
  { [key in keyof (typeof main)] : (
    util.Constructor.Tv<(typeof main)[key]["Props"]>["newValue" | "value"]
  ) ; }
) ;
type SupportedCaTypeImpl = (
  keyof SupportedCaProps
) ;
/** 
 * every supported *type*.
 * 
 */
export type SupportedCaType = (
  keyof SupportedCaDescTable
) ;
/** 
 * every supported model.
 * 
 */
export type SupportedCaDesc<Type extends SupportedCaType = SupportedCaType> = (
  SupportedCaDescTable[Type]
) ;
export type SupportedCaDescTable = (
  { [type1 in SupportedCaTypeImpl]: { type: type1 ; } & SupportedCaProps[type1] ; }
) ;
export function renderEditorForCa<CaType extends SupportedCaType>(...args: (
  Parameters<typeof renderEditorForCaImpl<CaType>>
)) {
  return renderEditorForCaImpl(...args) ;
}
const renderEditorForCaImpl = (
  function<CaType extends SupportedCaType>(c: SupportedCaDesc<CaType> ) {
    const PrimaryDisplayComp = (
      main[c.type satisfies CaType]
      .render
    ) ;
    const primary = (
      // @ts-ignore
      <PrimaryDisplayComp 
      {...c }
      />
    ) ;
    const mSourceCode = (
      JSON.stringify(c, null, 2)
    ) ;
    return (
      <g>
        <title>
          { mSourceCode }
        </title>
        { primary }
      </g>
    ) ;
  }
) ;






import type { XAppProps as XGP, } from "src/projects/svp/content-adapters/for-g-nodes";
import { main as xg, } from "src/projects/svp/content-adapters/for-g-nodes";
import { main as xp, } from "src/projects/svp/content-adapters/for-path-nodes";

0 && console["log"](TypeError()) ;

/** 
 * every peer shall conform to this `type`.
 * 
 */
interface CaBaseOps { 
  render : CaBaseOps.RenderCompImpl<this> ;
  Props : util.Constructor.AtContravar<never> ;
} ;
namespace CaBaseOps {
  
  export type RenderPropsImpl<This extends CaBaseOps> = (
    Tcv<This["Props"]>["newValue"]
  ) ;
  export type RenderCompImpl<This extends CaBaseOps> = (
    { (props: CaBaseOps.RenderPropsImpl<This>): util.React.ReactElement ; }
  ) ;

  ; // extra semicolon due to TS(1205)
} ;
export { CaBaseOps, } ;
const main = ({
  g: xg , // //
  path: (
    xp 
  ) ,
}) satisfies (
  { [key: string]: CaBaseOps ; }
) ;

export default main ;

/** 
 * 
 * 
 * @deprecated
 */
export type Tcv<Desc extends {}> = (
  util.Constructor.Tv<Desc>
) ;

























export {} ; // TS-1208
