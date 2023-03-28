import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/setupIonicReact1'
import { IonApp, IonContent, } from '@ionic/react' 
import App from './App'
// import * as assert from "assert" ;
// (assert as (typeof assert extends infer O ? { [k in keyof O ]: O[k] } : never )).ok = (v, m) => {
//   if (v) {
//     //
//   } else {
//     if (m instanceof Error) throw m ;
//     throw new Error(m) ;
//   }
// } ;
import './index.css'


/** 
 * an Error Boundary which will show a "complaint and restart" btn for Exception(s)
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
          <div>
            <p>
              { complaintBtn }
            </p>
            { errorMsgComp }
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /** 
   * added boundaries:
   * - {@link WithErrorBound} to add possible "complaint and restart" btn
   * - {@link IonApp} to avoid issues with overlays and etc not working properly
   * - {@link IonContent} to avoid page clipping
   * 
   */
  <React.StrictMode>
    <WithErrorBound>
    <IonApp>
    <IonContent>
    <App />
    </IonContent>
    </IonApp>
    </WithErrorBound>
  </React.StrictMode>,
)
