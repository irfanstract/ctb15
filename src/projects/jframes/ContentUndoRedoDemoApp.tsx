


import { useState } from 'react'
import * as Assert from "assert";
import * as util from "src/utility-functions/all" ;
import ToDoListComponent from 'src/projects/ToDoListComponent';
import { ToDoListDemoComponent, } from 'src/projects/ToDoListComponent';
import JFrame from 'src/projects/jframes/FileEditViewWindowComponent';
import { useUndoableState, } from 'src/projects/jfu/undo-stacking';
import { UndoOrRedoStack, UndoRedoHeadStack, } from 'src/projects/jfu/undo-stacking';











const JFrameUndoRedoBtnDemoComp1 = () => {
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
const JFrameUndoRedoBtnDemoComp = (
  () => {
    const [value, undoRedoOps] = (
      useUndoableState({
        initialState: (
          UndoRedoHeadStack.new<string>({
            headValue: "hello" ,
          })
        ) ,
      })
    ) ;
    return (
      <JFrame 
      undoManager={{
        undo: undoRedoOps.undoStack.size ? (() => undoRedoOps.undo() ) : undefined ,
        redo: undoRedoOps.redoStack.size ? (() => undoRedoOps.redo() ) : undefined ,
        getUndoCount: () => undoRedoOps.undoStack.size ,
      }}
      editHandler={{
        invokeCopy() {} ,
        invokePaste: () => undoRedoOps.commit(String(Math.random() ) ) ,
      }}
      mainDocContentView={(
        <p>
          value: <code>{JSON.stringify(value) }</code>
        </p>
      )}
      style={{
        resize: "both" ,
      }}
      />
    ) ;
  }
) ;












export default JFrameUndoRedoBtnDemoComp ;
