
import * as util from "src/projects/jframes/util" ;


export interface XJSX extends JSX.Element {
  type: string | util.React.JSXElementConstructor<any> ,
}
export const isXReactElement: {
  (e: util.React.ReactNode): e is util.React.ReactElement ;
} = (e): e is util.React.ReactElement => {
  return (
    !!e && (typeof e === "object") && !!(e as Partial<XJSX>)["type"]
  ) ;
};





import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";
export { OpButton, } ;

import { Ionic, } from "src/projects/jframes/util";
export { Ionic, } ;

export const renderIonicItemFromElement = (
  function AGAIN(e: util.React.ReactElement): util.React.ReactElement {
    // console["log"]({ e, }) ;
    if (1) {
      S :
      switch (((e satisfies JSX.Element) as XJSX).type) {
        case util.React.Fragment :
          // console["log"]({ e, }) ;
          // console["log"](util.React.Children.toArray(e)) ;
          util.assert.ok(e && typeof e === "object") ;
          util.assert.ok(isXReactElement(e) ) ;
          ;
          const children = (
            util.React.Children.toArray((
              e.props.children
            ))
          ) ;
          ;
          // if (children.length === 1) {
          //   console["log"]("error", { e, children, }) ;
          //   ;
          //   break S ;
          // }
          if (children.length === 1) {
            const e = children[0]! ;
            if (isXReactElement(e) ) {
              return (
                AGAIN(e)
              ) ;
            }
          }
          ;
          console["log"]({ e, children, cpc: e.props.children }) ;
          ;
          return (
            <>{(  
              children
              .map(e => {
                if (isXReactElement(e) ) {
                  return AGAIN(e) ;
                }
                return e ;
              } )
            )}</>
          ) ;
        case Ionic.IonItemDivider :
          return e ;
        case Button :
        case OpButton :
        case Ionic.Button :
        case "button" :
        case Ionic.IonButton :
          if (e.type === OpButton) {
            return (
              <Ionic.Item 
              key={e.key }
              button
              type="button"
              disabled={e.props.disabled || !e.props.onClick }
              {...e.props }
              />
            ) ;
          }
          return (
            <Ionic.Item 
            key={e.key }
            button
            {...e.props }
            />
          ) ;
      }
    }
    return (
      <Ionic.Item 
      children={(
        <div
        style={{
          inlineSize: `100%` ,
          display: "flex" ,
          flexDirection: "column" ,
        }}
        children={e }
        /> 
      )} 
      />
    ) ;
  }
) ;

























