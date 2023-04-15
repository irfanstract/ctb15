import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as Assert from "assert";
import * as util from "src/utility-functions/all" ;
import ToDoListComponent from 'src/projects/ToDoListComponent';
import { ToDoListDemoComponent, } from 'src/projects/ToDoListComponent';
import JFrame from 'src/projects/jframes/FileEditViewWindowComponent';
import JFrameUndoRedoBtnDemoComp from 'src/projects/jframes/ContentUndoRedoDemoApp';
import EmAsyncifyExample from "src/projects/em_asyncify_example.out.wasm?init" ;
import emAsyncifyExampleAgain from "src/projects/em_asyncify_example1" ; //
import SvpComp from 'src/projects/svp/main';
//
import './App.css'
import { DpfhButton, } from 'src/projects/ffp/main' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div hidden>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1) ; }}>
          count is {count}
        </button>
        <SvpComp /> 
        <ToDoListDemoComponent />
        <IJFrameDemo />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        <a href="about:blank">
          <code>about:blank</code>
        </a>
        <DpfhButton />
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

const IJFrameDemo = (
  JFrameUndoRedoBtnDemoComp
) ;

export default App

null || (async () => {
  type IWeav = WebAssembly.ExportValue ;
  if (0) {
    ;
    const { main, } = (
      (
        (await EmAsyncifyExample({
          imports: {
            // a: () => { throw new Error("imports.a"); }, 
            // a: {
            //   // modules: {} ,
            //   a: () => { throw new Error("imports.a"); } ,
            // } ,
            get a(): never { throw new Error("imports.a"); } ,
          } ,
        }))
        .exports
      ) satisfies WebAssembly.Exports
    ) ;
    console["log"]({ main, }) ; //
  }
  if (1) {
    ;
    const m = emAsyncifyExampleAgain ;
    console["log"]({ m, }) ;
    (async () => {
      const exp = await emAsyncifyExampleAgain() ;
      console["log"]({ exp, }) ;
    } )() ;
  }
  // import("src/projects/em_asyncify_examplem.cjs");
})();
