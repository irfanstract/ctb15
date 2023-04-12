

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

/** 
 * React's native `useState` does not itself provide undo/redo support.
 * 
 * this method serves as a wrapper which provide `undo` and `redo`.
 * internally this'd maintain some stacks one for `undo` and one for `redo`.
 * note that 
 * with this `useYyy` there's no support for serialising the undo-or-redo stacks; 
 * switch to {@link useUndoRedoStack } to achieve that.
 * 
 * @deprecated use {@link useUndoRedoStack } instead
 * 
 */
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
    const {
      undo ,
      redo ,
      commit ,
    } = (
      URS({
        processDigestAndSave: save ,
      })
    ) ;
    {
      const { headValue: v, } = mss ;
      return [
        v ,
        { undo, redo, commit, ...mss, state: mss, } ,
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
/** 
 * ad-hoc function
 * 
 */
function URS<A1> (...[{
  processDigestAndSave: save, 
}] : [
  options: {
    processDigestAndSave: (
      util.React.Dispatch<(
        /* sadly, `UndoRedoHeadStack<?> & Function` does not equate `never` ... */
        UndoRedoHeadStack<A1> extends infer T ? 
        { (value: T): T ; } : never
      )>
    ) ,
  } ,
]) {
  ;
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
  ;
  return {
    undo ,
    redo ,
    commit ,
  } ;
}
/** 
 * this is a generalisation of {@link useUndoableState } ;
 * now this expects externally-supplied stacks instead of internally-maintained one and
 * this is necessary for trivial control over the centralisation and the serialisation
 * (for example, via "routing", via LocalStorage or IndexedDB).
 * 
 * @see {@link UndoRedoHeadStack }
 * 
 */
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
    const {
      undo ,
      redo ,
      commit ,
    } = (
      URS<Value>({
        processDigestAndSave: (getUpdatedFor) => (
          save((
            getUpdatedFor(mss)
          ))
        ) ,
      })
    ) ;
    {
      const { headValue: v, } = mss ;
      return [
        v ,
        {
          undo ,
          redo ,
          commit ,
          ...mss ,
          state: mss ,
        } ,
      ] ;
    }
  } 
) ;










