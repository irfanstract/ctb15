
import * as util from "src/utility-functions/all" ;




import {
  CommiteeDesc ,
  TaskDesc ,
} from "src/projects/ToDoListing" ;

import Button from "./Button";

import TdlCss from "./TDL.module.css" ;

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

    }>
  )>
) = ({
  value: tasks0 ,
  onMarkItemAsCompleted ,
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
    <div className={`${TdlCss.ToDoList } ` }> 
      <p>
        To-Do List
      </p>
      <ol>
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
                  if ((1 < mAssignees.length)) {
                    break B1 ;
                  }
                  if (onMarkItemAsCompleted) {
                    return (
                      () => {
                        return (
                          onMarkItemAsCompleted({
                            i: entryOrdinal ,
                          })
                        ) ;
                      }
                    ) ;
                  }
                }
                return false ;
              })()
            )} // TODO
            />
          ) ;
          return (
            <li key={tKey} >
              { titleDisplay }
              { assignmentalDisplay }
              { completionalStatDisplay }
            </li>
          ) ;
        } )
      )}
      </ol>
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
    return (
      <div>
      <ToDoListComponent 
      value={value}
      onMarkItemAsCompleted={({
        i: i ,
      }) => {
        markNthItemAsDone(i) ;
      }}
      />
      <p>
        <Button
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
