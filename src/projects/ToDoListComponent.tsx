
import * as util from "src/utility-functions/all" ;




import {
  CommiteeDesc ,
  TaskDesc ,
} from "src/projects/ToDoListing" ;

import * as ionIcons from "ionicons" ;

import Button from "./Button";

import {
  IonList ,
  IonReorderGroup ,
  IonItem ,
  IonReorder ,
} from "@ionic/react" ;

const tlcExemplaryTasksList = (
  [
    {
      title: `simple task 1A` ,
      done: true ,
    } ,
    { 
      assignees: [ 
        { title: "Ve Rn" , } ,
      ] ,
    } ,
    {
      title: `Task 3` ,
    } ,
    {
      title: `simple task 1C` ,
      assignees: [
        { title: "Ve Rb" , } ,
        { title: "Ve Rn" , } ,
        { } ,
      ] ,
    } ,
    { 
      title: `simple task 1D` ,
      assignees: [ 
        { title: "Ve Rn" , } ,
      ] ,
    } ,
    {
      title: `Task 6` ,
    } ,
  ] satisfies TaskDesc[]
) ;

const ToDoListComponent: (
  util.React.FC<(
    & { value: 3 | TaskDesc[] ; }
    & Partial<{ 
      
      /** 
       * optional action to run whenever "marrk as completed" gets clicked.
       * can be omitted, in which case would avoid rendering such a button.
       * 
       */
      onMarkItemAsCompleted: false | util.React.Dispatch<{ i: number ; }> ; 

      onItemReorder: false | util.React.Dispatch<{ from: number ; to: number ; }> ;

    }>
  )>
) = ({
  value: tasks0 ,
  onMarkItemAsCompleted: implMarkItemAsCompleted ,
  onItemReorder: onItemReorder ,
}) => {
  const {
    tasks ,
  } = (
    ((): (
      & {
        tasks: TaskDesc[] ;
      }
    ) => {
      if (tasks0 === 3) {
        return {
          tasks: tlcExemplaryTasksList ,
        } ;
      }
      return {
        tasks: tasks0 ,
      } ;
    })() 
  ) ;
  return (
    <div className={`ToDoList md ` }> 
      <p>
        To-Do List
      </p>
      <IonList
      //
      >
      <IonReorderGroup
      {...(
        onItemReorder ?
        {
          disabled: false ,
          onIonItemReorder: (e ) => {
            onItemReorder(e.detail) ;
            /** 
             * need to have `complete(false)` eventually called, asynchronously;
             * `complete()` is *necessary*
             * 
             */
            e.detail.complete(false) ;
          } ,
        }
        : { disabled: true , }
      )}
      >
      {(
        tasks
        .map(desc => /* add UID */ ({ ...desc, uid: JSON.stringify(desc), }) ) 
        .map((entry, entryOrdinal): util.React.ReactElement => {
          const {
            uid: tKey ,
            title: entryTitle = "",
            assignees: mAssignees = [] ,
            done: mDone = false ,
          } = entry ;
          const titleDisplay = (
            <p>
              title: { getTitleUtfAsQuotedOrSayNoDesc(entryTitle) }
            </p>
          ) ;
          const assignmentalDisplay = (
            <div>
            <p>
              assignees:
            </p>
            <ul>
            { (
              mAssignees
              .map(desc => /* add UID */ ({ ...desc, uid: JSON.stringify(desc), }) ) 
              .map((entry) => {
                const aKey = entry.uid ;
                const aTitle = (
                  getTitleUtfAsQuotedOrSayNoDesc(entry.title ?? "")
                ) ;
                return (
                  <li key={aKey } >
                    <a href="javascript:void(0)">
                    { aTitle }
                    </a>
                  </li>
                ) ;
              })
            ) }
            </ul>
            </div>
          ) ;
          const completionalStatDisplay = (
            <PercentualCompletionalStatRender 
            value={(mDone === true) ? 1 : 0.5 }
            onMarkAsCompleted={(
              // (1 < mAssignees.length) ? false : (() => {})
              (() => {
                B1:
                {
                  if (!implMarkItemAsCompleted) {
                    break B1 ;
                  }
                  if ((1 < mAssignees.length)) {
                    break B1 ;
                  }
                  return (
                    () => (
                      implMarkItemAsCompleted({
                        i: entryOrdinal ,
                      })
                    )
                  ) ;
                }
                return false ;
              })()
            )} // TODO
            />
          ) ;
          return (
            <IonItem key={tKey} >
            <IonReorder>
              <code>#{ entryOrdinal }</code>
            </IonReorder>
            <div>
              { titleDisplay }
              <details>
              { assignmentalDisplay }
              </details>
              { completionalStatDisplay }
            </div>
            </IonItem>
          ) ;
        } )
      )}
      </IonReorderGroup>
      </IonList>
    </div>
  ) ;
} ;

const PercentualCompletionalStatRender: (
  util.React.FC<(
    & { value: 0 | 0.5 | 1 ; }

    & Partial<{ 
      
      /** 
       * optional action to run whenever "marrk as completed" gets clicked.
       * can be omitted, in which case would avoid rendering such a button.
       * 
       */
      onMarkAsCompleted: false | util.React.DispatchWithoutAction ; 

    }>

  )>
) = ({
  value ,
  onMarkAsCompleted: markAsCompleted = false ,
}) => {
  const statusDisplayParagraph = (
    <p>
      Status: {} 
      {( 
        { 
          [ 0   ]: "0", 
          [ 0.5 ]: "in progress", 
          [ 1   ]: "completed",
        }[value] 
      )}
    </p>
  ) ;
  const optionalMarkPretendCompleteButton = (
    (value < 1) && (
      markAsCompleted && (
        <Button
        type="button"
        onClick={() => markAsCompleted()}
        >
          Mark As Completed
        </Button>
      )
    )
  ) ;
  const extraActionsBar = (
    <p>
      { optionalMarkPretendCompleteButton }
    </p>
  ) ;
  return (
    <div>
      { statusDisplayParagraph }
      { extraActionsBar }
    </div>
  ) ;
} ;

const getTitleUtfAsQuotedOrSayNoDesc: {
  (v: string): util.React.ReactElement ;
} = (
  (desc0) => (
    desc0 ?
    <q>{ desc0 }</q>
    : <span>(<em>no title</em>)</span>
  )
) ;




export default ToDoListComponent ;

export const ToDoListDemoComponent = ( 
  () => {
    const [value, setValue] = (
      util.React.useState<(
        util.React.ComponentProps<typeof ToDoListComponent>["value"] & {}[]
      )>(tlcExemplaryTasksList)
    ) ;
    function markNthItemAsDone(i: number): void;
    function markNthItemAsDone(assignedItemOrdinal: number): void {
      setValue(list0 => (
        list0
        .map((item, iteratedItemOrdinal) => {
          if (iteratedItemOrdinal === assignedItemOrdinal) {
            return { ...item, done: true, } ;
          }
          return item ;
        })
      )) ;
    }
    function reorderItems(...args: [
      { from: number ; to: number ; } ,
    ]): void;
    function reorderItems(...[
      { from: srcIndex, to: destinedIndex, }
    ]: [
      { from: number ; to: number ; } ,
    ]): void {
      setValue(ls0 => (
        [...util.Immutable.List(ls0).remove(srcIndex).insert(destinedIndex, ls0[srcIndex]!) ]
      ) ) ;
    }
    return (
      <div>
      <ToDoListComponent 
      value={value}
      onMarkItemAsCompleted={({
        i: i ,
      }) => {
        markNthItemAsDone(i) ;
      }}
      onItemReorder={e => {
        reorderItems(e) ;
      }}
      />
      <p>
        <Button
        type="button"
        onClick={() => setValue(() => tlcExemplaryTasksList) }
        >
          Reset 
        </Button>
      </p>
      </div>
    ) ;
  }
) ;

// assert they will all compile
{
  (
    <Button type="button">
        Do Some Action
    </Button>
  ) ;
  <ToDoListDemoComponent /> ;
}












































export {} ; // TS(1208)
