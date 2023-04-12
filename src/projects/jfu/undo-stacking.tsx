

import * as util from "src/utility-functions/all" ;








type UndoOrRedoStack<A> = (
  util.Immutable.Stack<A>
) ;

export const useUndoableState = (
  (<A1 extends {}, A2>({
    initialValue ,
  } : {
    initialValue: A1 ,
  } ) => {
    const [[v, ss], update] = (
      util.React.useState<(
        [
          A1, 
          { [k in keyof { undoStack: any ; redoStack: any ; }]: UndoOrRedoStack<A1> ; } ,
        ]
      )>([
        initialValue, 
        { undoStack: util.Immutable.Stack(), redoStack: util.Immutable.Stack(), } ,
      ])
    ) ;
    function undo(): void {
      update(([existingContentState, existingOptions ]) => {
        if (existingOptions.undoStack.size satisfies number ) {
          return [
            existingOptions.undoStack.get(0)!, 
            { 
              undoStack: existingOptions.undoStack.skip(1),  
              redoStack: existingOptions.redoStack.push(existingContentState) ,  
            } ,
          ] ;
        }
        return [existingContentState, existingOptions ] ;
      } )
    }
    function redo(): void {
      update(([existingContentState, existingOptions ]) => {
        if (existingOptions.redoStack.size satisfies number ) {
          return [
            existingOptions.redoStack.get(0)!, 
            { 
              undoStack: existingOptions.undoStack.push(existingContentState),  
              redoStack: existingOptions.redoStack.skip(1) ,  
            } ,
          ] ;
        }
        return [existingContentState, existingOptions ] ;
      } )
    }
    function commit(value: A1): void {
      update(([existingContentState, existingOptions ]) => {
        return [
          value, 
          { 
            undoStack: existingOptions.undoStack.push(value),  
            redoStack: existingOptions.redoStack.take(0) ,  
          } ,
        ] ;
      } )
    }
    return [
      v ,
      { undo, redo, commit, ...ss, } ,
    ] ;
  }) satisfies {
    <A1 extends {}>(options: never): [
      A1, 
      { [k in keyof { undo: any ; redo: any ; }]: () => void ; } & { commit: (value: A1) => void ; },
    ] ;
  }
) ;










