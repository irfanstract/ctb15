

import * as util from "src/projects/svp/util" ;










type SupportedCaProps = (
  { [key in keyof (typeof main)] : (
    util.Constructor.Tv<(typeof main)[key]["Props"]>["newValue" | "value"]
  ) ; }
) ;
type SupportedCaTypeImpl = (
  keyof SupportedCaProps
) ;
export type SupportedCaType = (
  keyof SupportedCaDescTable
) ;
export type SupportedCaDescTable = (
  { [type1 in SupportedCaTypeImpl]: { type: type1 ; } & SupportedCaProps[type1] ; }
) ;
export type SupportedCaDesc<Type extends SupportedCaType = SupportedCaType> = (
  SupportedCaDescTable[Type]
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






import type { XAppProps as XGP, } from "src/projects/svp/content-adapters/g-node-impl";
import { main as xg, } from "src/projects/svp/content-adapters/g-node-impl";
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
    // new (class implements POps {
      
    //   Props = [] as {
    //     spec: string ; 
    //   }[] ;

    //   render = (...[
    //     { spec, } ,
    //   ]: [this["Props"][number] ] ) => {
    //     // TODO
    //     return (
    //       <path 
    //       d={spec }
    //       fill="blue"
    //       />
    //     ) ;
    //   } ;

    // })()
    // {
    //   Props: (
    //     util.Constructor.getNonFunctionalInstance()
    //   ) ,
      
    //   render: (...[
    //     { spec, } ,
    //   ] ) => {
    //     // TODO
    //     return (
    //       <path 
    //       d={spec }
    //       fill="blue"
    //       />
    //     ) ;
    //   } ,

    // } satisfies POps
    xp 
  ) ,
}) satisfies (
  // {
  //   [key in SupportedCaType]: (
  //     { 
  //       render : util.React.FC<SupportedCaProps[key] > ;
  //     }
  //   ) ;
  // }
  { [key: string]: CaBaseOps ; }
) ;
/** 
 * the specialisation of {@link CaBaseOps} for `path`s.
 * 
 */
// interface POps extends CaBaseOps {
//   Props: (
//     util.Constructor.AtContravar<(
//       & {
//         spec: string ; 
//       }
//     )>
//   ) ;
// } ;
type POps = import("./for-path-nodes").POps ;

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
