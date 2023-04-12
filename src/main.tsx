import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/setupIonicReact1'
import { IonApp, IonContent, } from '@ionic/react' 
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IonApp>
    <IonContent>
    <App />
    </IonContent>
    </IonApp>
  </React.StrictMode>,
)
