

import * as util from "src/projects/svp/util" ;










type SupportedCaProps = (
  { [key in keyof (typeof main)] : (
    util.Constructor.Tv<(typeof main)[key]["ContentProps"]>["newValue" | "value"]
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
  function<CaType extends SupportedCaType>(c: SupportedCaDesc<CaType> & (
    & {
      onChange?: (
        util.React.Dispatch<{ newValue: SupportedCaDesc<CaType> ; }>
      ) ;
    }
  ) ) {
    const {
      type: cls ,
    } = c ;
    const PrimaryDisplayComp = (
      (main[cls satisfies CaType] || (() => { throw TypeError(`for type '${cls }'`) ; } ) )
      .render
    ) ;
    const {
      onChange : propagateChangeEvt = Object ,
    } = c ;
    const primary = (
      // @ts-ignore
      <PrimaryDisplayComp 
      {...c }
      {...{
        onChange: ({ newValue, }) => {
          propagateChangeEvt({ 
            newValue: {
              ...newValue ,
              type: cls ,
            }, 
          }) ;
        } ,
      } }
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






0 && console["log"](TypeError()) ;

/** 
 * every {@link main handler } shall conform to this `type`.
 * 
 * @see {@link CaBaseOps }
 */
interface CaBaseOps { 
  render : CaBaseOps.RenderCompImpl<this> ;
  ContentProps : util.Constructor.AtContravar<never> ;
} ;
namespace CaBaseOps {
  
  export type RenderPropsImpl<This extends CaBaseOps> = (
    util.Constructor.Tv<This["ContentProps"]>["newValue"]
  ) extends (
    infer Props extends {}
  ) ? (
    
    Props
    & {
      onChange?: (
        util.React.Dispatch<{ newValue: Props ; }>
      ) ;
    }

  ) : never ;
  export type RenderCompImpl<This extends CaBaseOps> = (
    { (props: CaBaseOps.RenderPropsImpl<This>): util.React.ReactElement ; }
  ) ;

  ; // extra semicolon due to TS(1205)
} ;
export { CaBaseOps, } ;
const main = (() => {
  /** 
   * the {@link EntryInstCtx} to use
   * 
   */
  const injend = {
    
    renderEditorForItem: (
      renderEditorForCa
    ) ,

  } satisfies EntryInstCtx ;
  /** 
   * 
   */
  return ({

    g   : xg(injend) , 
    path: xp(injend) ,
    
  }) satisfies (
    { [key: string]: CaBaseOps ; }
  ) ;
})() ;
/** 
 * the ops/ctx/env/vars which the init shall give to each of the plugin(s)
 * 
 */
export interface EntryInstCtx {
  
  renderEditorForItem: typeof renderEditorForCa ;

}
import { main as xg, } from "src/projects/svp/content-adapters/for-g-nodes";
import { main as xp, } from "src/projects/svp/content-adapters/for-path-nodes";

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
