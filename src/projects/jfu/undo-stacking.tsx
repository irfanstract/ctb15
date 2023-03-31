

import * as util from "src/utility-functions/all" ;








import {
  UndoOrRedoStack, 
  UndoRedoHeadStack ,
} from "./undo-stack";
export {
  UndoOrRedoStack, 
  UndoRedoHeadStack ,
} ;

export type UndoableStateHook = (
  typeof useUndoableState
) ;

export const useUndoableState = (
  (<A1 extends UndoRedoHeadStack.ValueBaseMinimum, /* unused */ >(...[{
    initialState ,
  }] : [
    options: (
      & {
        /** 
         * 
         * @see 
         * {@link UndoRedoHeadStack.byHeadAndStacks } and
         * {@link UndoRedoHeadStack.new } 
         */
        initialState: UndoRedoHeadStack<A1> ,
      }
    ) ,
  ]) => {
    const [mss, update] = (
      util.React.useState<(
        UndoRedoHeadStack<A1>
      )>((
        initialState
      ))
    ) ;
    const save = update;
    function undo(): void ;
    function undo(): void {
      save(s => (
        s.afterUndo()
      ) )
    }
    function redo(): void ;
    function redo(): void {
      save(s => (
        s.afterRedo()
      ) )
    }
    function commit(value: A1): void ;
    function commit(commend: A1): void {
      save(s => (
        s.afterCommit(commend)
      ) )
    }
    {
      const { headValue: v, } = mss ;
      return [
        v ,
        { undo, redo, commit, ...mss, } ,
      ] ;
    }
  }) satisfies {
    <Value extends {}>(options: never): [
      Value, 
      (
        & { [k in keyof { undo: any ; redo: any ; }]: () => void ; } 
        & { commit: (value: Value) => void ; }
      ),
    ] ;
  }
) ;
export const useUndoRedoStack = (
  function <Value extends UndoRedoHeadStack.ValueBaseMinimum> (...[
    mss, {
      onChange: pushMerge ,
    } ,
  ]: [
    UndoRedoHeadStack<Value> ,
    (
      & { onChange: util.React.Dispatch<{ newStack: UndoRedoHeadStack<Value> ; }> ; }
    ) ,
  ]): ReturnType<typeof useUndoableState<Value> > {
    const save = (s: UndoRedoHeadStack<Value>) => (
      pushMerge({
        newStack: s ,
      })
    ) ;
    ;
    function undo(): void ;
    function undo(): void {
      save((
        mss.afterUndo()
      ) )
    }
    function redo(): void ;
    function redo(): void {
      save((
        mss.afterRedo()
      ) )
    }
    function commit(value: Value): void ;
    function commit(commend: Value): void {
      save((
        mss.afterCommit(commend)
      ) )
    }
    {
      const { headValue: v, } = mss ;
      return [
        v ,
        {
          undo ,
          redo ,
          commit ,
          ...mss ,
        } ,
      ] ;
    }
  } 
) ;










