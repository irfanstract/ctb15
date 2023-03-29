


import * as util from "src/utility-functions/all" ;
import React from 'react'
import ReactDOM from 'react-dom/client'











/** 
 * an Error Boundary which 
 * will show a "complaint and restart" btn for Exception(s) . 
 * necessary for quick "try again" upon component errors.
 * 
 */
const WithErrorBound = (() => {
  class EBC extends React.Component<React.PropsWithChildren, { error : null | Error ; }> {
    render(): React.ReactNode {
      const props = { ...this.props, ...(this.state || {}), } ;
      const { error: lastError, } = props ;
      if (lastError) {
        const complaintBtn = (
          <button 
          type="button"
          children={"!!!"}
          onClick={() => this.setState({ error: null, }) }
          />
        ) ;
        const errorMsgComp = (
          <pre>
            { lastError.stack }
          </pre>
        ) ;
        return (
          <div
          style={{
            textAlign: "start",
          }}
          >
            <p>
              Error
            </p>
            <p>
              { complaintBtn }
            </p>
            <div 
            style={{ 
              maxInlineSize: "45em", 
              minInlineSize: "25em", 
              overflow: "auto", 
              transition: `all 0.5s ease-out` ,
            }}>
              <XDetails 
              children={errorMsgComp }
              />
            </div>
          </div>
        ) ;
      } else {
        return <>{ props.children }</> ;
      }
    }
    componentDidCatch: (React.Component)["componentDidCatch"] = (e) => {
      this.setState({ error: e, }) ;
    } ;
  }  
  return (
    (function ErrorBoundedComponent(props: React.ComponentPropsWithoutRef<typeof EBC>) {
      return (
        <EBC {...props} />
      ) ;
    })
  ) ;
})() ;

const XDetails = (
  ({ children: errorMsgComp, }: React.PropsWithChildren) => (
    <details>
    <div
    style={{ 
      zoom: "80%" ,
    }}
    >
    { errorMsgComp }
    </div>
    </details>
  )
) ;










export default WithErrorBound ; // due to TS(1208), and as the main-export

