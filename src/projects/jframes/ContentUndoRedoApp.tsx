


import { useState } from 'react'
import * as Assert from "assert";
import * as util from "src/utility-functions/all" ;
import ToDoListComponent from 'src/projects/ToDoListComponent';
import { ToDoListDemoComponent, } from 'src/projects/ToDoListComponent';
import JFrame from 'src/projects/jframes/FileEditViewWindowComponent';











const JFrameUndoRedoBtnDemoComp = () => {
  const [state, setState] = (
    useState<{ undoCount: number ; }>({ undoCount: 0, })
  ) ;
  return (
    <JFrame 
    undoManager={{
      undo: state.undoCount ? (() => (setState(s0 => ({ ...s0, undoCount: s0.undoCount + (-1), }) ) ) ) : undefined ,
      redo: true            ? (() => (setState(s0 => ({ ...s0, undoCount: s0.undoCount + ( 1), }) ) ) ) : undefined ,
      getUndoCount: () => state.undoCount ,
    }}
    editHandler={{
      invokeCopy() {} ,
      invokePaste: () => (setState(s0 => ({ ...s0, undoCount: s0.undoCount + 1, }) ) ) ,
    }}
    style={{
      resize: "both" ,
    }}
    />
  ) ;
} ;












export default JFrameUndoRedoBtnDemoComp ;
