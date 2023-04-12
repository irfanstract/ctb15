import "src/window-polyfills" 
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/setupIonicReact1'
import WithErrorBound from './projects/JsxErrorBound'
import { IonApp, IonContent, } from '@ionic/react' 
import App from './App'
import "src/projects/xmf/main";
import './index.css'

/** 
 * added boundaries:
 * - {@link WithErrorBound} 
 *   to add possible "complaint and quick-restart" btn
 * - {@link IonApp}, given the usage(s) of Ionic Components,
 *   to avoid issues with them not working properly
 * - {@link IonContent}, when using {@link IonApp}, 
 *   to avoid page clipping
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
