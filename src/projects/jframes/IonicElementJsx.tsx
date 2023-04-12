
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

import { IonFoldedMenuComp, } from "./PopupMenu";

/** 
 * `<ion-item>`s can natively be buttons, and in such case
 * it shall never contain `<button>`s
 * 
 */
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
          const cpc = (
            e.props.children
          ) ;
          const cta = (
            util.React.Children.toArray((
              cpc
            ))
            .filter((e): e is ({} & typeof e) => (
              e !== undefined 
              && e !== null
            ) )
          ) ;
          ;
          // if (children.length === 1) {
          //   console["log"]("error", { e, children, }) ;
          //   ;
          //   break S ;
          // }
          if (cta.length === 1) {
            const e = cta[0]! ;
            if (isXReactElement(e) ) {
              return (
                AGAIN(e)
              ) ;
            }
          }
          ;
          console["log"]({ 
            e,  
            cpc,
            cta,
          }) ;
          ;
          /** 
           * at this point,
           * treat the array as an (ordered) group of zero-or-more items
           */
          return (
            <>{(  
              cta
              .map(e => {
                if (isXReactElement(e) ) {
                  return AGAIN(e) ;
                }
                return e ;
              } )
            )}</>
          ) ;

        case Ionic.IonItem :
          return e ;
        case Ionic.IonItemDivider :
          return e ;
          
        case IonFoldedMenuComp :
          return e ;
          
        case Button :
        case OpButton :
        case Ionic.Button :
        case "button" :
        case Ionic.IonButton :
          // if (e.type === OpButton) {
          //   return (
          //     <Ionic.Item 
          //     key={e.key }
          //     button
          //     type="button"
          //     disabled={e.props.disabled || !e.props.onClick }
          //     {...e.props }
          //     />
          //   ) ;
          // }
          // return (
          //   <Ionic.Item 
          //   key={e.key }
          //   button
          //   {...e.props }
          //   />
          // ) ;
          return (
            <Ionic.Item 
            key={e.key }
            button
            type="button"
            {...(
              e.type === OpButton ?
              {
                disabled: e.props.disabled || !e.props.onClick ,
                ...e.props ,
              } :
              {
                ...e.props ,
              }
            ) }
            />
          ) ;
          
      }
    }
    util.assert.ok(!(e.type === IonFoldedMenuComp));
    if (0) {
      ;
      if (String((e as any).type.$$typeof ) === "Symbol(react.forward_ref)" ) {
        console["log"]({ e, IonFoldedMenuComp, });
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
        // e
      )} 
      style={{
        "--IoeTsxEwType" : (
          null &&
          String(e.type)
        ) ,
        "--IoeTsxEwTYpeKeys" : (
          null && 
          Object.keys(e.type)
        ) ,
        "--IoeTsxEwTYpeValues" : (
          null && 
          Object.values(e.type).map(e => String(e))
        ) ,
        "--IoeTsxEwPropsKeys" : Object.keys(e.props) ,
      }}
      />
    ) ;
  }
) ;


























