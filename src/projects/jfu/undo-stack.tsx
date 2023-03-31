

import * as util from "src/utility-functions/all" ;





type UndoOrRedoStack<A> = (
  util.Immutable.Stack<A>
) ;
namespace UndoOrRedoStack {;} // TS(1205)
export { UndoOrRedoStack , } ;



/** 
 * instances of this `class` each
 * shall be 
 * an {@link util.Immutable immutable } organisation of 
 * a triad of states (*head value*, *undo stack*, *redo stack*) 
 * .
 * 
 * methods are provided as normal way of working with this;
 * they {@link util.Immutable return new instances (due to immutability) } as specified.
 * 
 */
export abstract class UndoRedoHeadStack<A> {

  abstract readonly undoStack : UndoOrRedoStack<A> ;
  abstract readonly redoStack : UndoOrRedoStack<A> ;
  abstract readonly headValue : A ;

  protected constructor(key: typeof urhKey) {}
  
  static byHeadAndStacks<Value extends UndoRedoHeadStack.ValueBaseMinimum>({
    undoStack ,
    redoStack ,
    headValue ,
  }: (
    Pick<UndoRedoHeadStack<Value>, "undoStack" | "redoStack" | "headValue">
  )): UndoRedoHeadStack<Value> {
    return (
      UndoRedoHeadStackImpl.byOptions<Value>({
        undoStack ,
        redoStack ,
        headValue ,
      })
    );
  }
  
  abstract generified<A2 extends UndoRedoHeadStack.ValueBaseMinimum = Omit<A, never>>(): UndoRedoHeadStack<A | A2> ;

  abstract afterUndo(): UndoRedoHeadStack<A> ;
  abstract afterRedo(): UndoRedoHeadStack<A> ;
  abstract withReplacedRedoStack(s: UndoOrRedoStack<A> ): UndoRedoHeadStack<A> ;
  abstract afterCommit(value: A): UndoRedoHeadStack<A> ;

  abstract reversed(): UndoRedoHeadStack<A> ;

  toString(): string {
    return JSON.stringify(this) ;
  }

  static new: {
    
    <Value extends UndoRedoHeadStack.ValueBaseMinimum>(
      options: (
        & { headValue: Value ; }
      ) ,
    ): UndoRedoHeadStack<Value>

  } = (
    (<Value extends UndoRedoHeadStack.ValueBaseMinimum, /* unused */ _8>(...[{
      headValue ,
    }]: Parameters<typeof UndoRedoHeadStack.new<Value > > ) => { 
      return (
        UndoRedoHeadStack.byHeadAndStacks<Value>({
          
          /* the head-value */
          headValue: headValue ,

          /* both empty */
          undoStack: util.Immutable.Stack() ,
          redoStack: util.Immutable.Stack() ,
          
        })
      ) ;
    } )
  ) ;
  
} ;
export namespace UndoRedoHeadStack {

  export type ValueBaseMinimum = {} ;

  ; // due to TS(1205) and to avoid the out-of-sync(ness) in renaming 
} ;
const urhKey = Symbol() ;

const UndoRedoHeadStackImpl = class UndoRedoHeadStack1<A extends UndoRedoHeadStack.ValueBaseMinimum> extends UndoRedoHeadStack<A> {

  protected constructor(
    public readonly undoStack: UndoOrRedoStack<A> ,
    public readonly redoStack: UndoOrRedoStack<A> ,
    public readonly headValue: A ,
  ) {
    super(urhKey) ;
  }
  static byOptions<Value extends UndoRedoHeadStack.ValueBaseMinimum>({
    undoStack ,
    redoStack ,
    headValue ,
  }: (
    Parameters<typeof UndoRedoHeadStack.byHeadAndStacks<Value>>[0]
  )): UndoRedoHeadStack<Value> {
    return new UndoRedoHeadStackImpl<Value>(
      undoStack ,
      redoStack ,
      headValue ,
    );
  }
  
  generified() {
    return this ;
  }

  afterUndo () {
    if (this.undoStack.size) {
      const newHeadValue = (
        this.undoStack.first()! satisfies A
      ) ;
      return (
        UndoRedoHeadStack.byHeadAndStacks<A>({
          
          /* undo-stack pop, redo-stack push */
          undoStack: this.undoStack.pop() ,
          redoStack: this.redoStack.push(this.headValue ) ,
          
          /* `headValue` update */
          headValue: newHeadValue ,
          
        }) 
      ) ;
    }
    return this ;
  } 
  afterRedo() {
    return (
      this
      .reversed()
      .afterUndo()
      .reversed()
    ) ;
  } ;
  withReplacedRedoStack(s: UndoOrRedoStack<A> ) {
    return (
      UndoRedoHeadStack.byHeadAndStacks<A>({
        redoStack: s ,
  
        /* no change */
        headValue: this.headValue ,
        undoStack: this.undoStack ,
  
      })
    ) ;
  } ;
  afterCommit(...[commit]: [value: A]) {
    return (
      this
      .withReplacedRedoStack(util.Immutable.Stack([commit] satisfies A[]) )
      .afterRedo()
    ) ;
  } ;

  reversed(): UndoRedoHeadStack<A> ;
  reversed() {
    return (
      UndoRedoHeadStack.byHeadAndStacks<A>({

        /* swapped */
        undoStack: this.redoStack ,
        redoStack: this.undoStack ,
        
        /* unchanged */
        headValue: this.headValue ,
        
      })
    ) ;
  }

} ;










