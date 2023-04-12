import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/setupIonicReact1'
import WithErrorBound from './projects/JsxErrorBound'
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
 * added boundaries:
 * - {@link WithErrorBound} to add possible "complaint and restart" btn
 * - {@link IonApp} to avoid issues with overlays and etc not working properly
 * - {@link IonContent} to avoid page clipping
 * 
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
