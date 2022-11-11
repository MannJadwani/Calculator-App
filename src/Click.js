import {useReducer} from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import EvaluateButton from './EvaluateButton'

export const ACTIONS ={
    ADD_DIGIT:'add-digit',
    CHOOSE_OPERATION: 'choose_operation',
    DELETE_DIGIT: 'delete_digit',
    EVAULATE:'evaulate',
    CLEAR: 'clear'
}

function reducer(state,{type,payload}){
switch(type){
    case ACTIONS.ADD_DIGIT:
        if(state.overwrite){

            return{
                ...state,
                currentOperand:payload.digit,
                operation: null,
                previousOperand:null,
                overwrite:false
            }
        }
        if(payload.digit === '0' && state.currentOperand==='0'){
            return state
        }
         if((payload.digit==='.' && state.currentOperand.includes('.')) ){
            return state
         }
            return{
                ...state,
                currentOperand: `${state.currentOperand||''}${payload.digit}`
            }    
    case ACTIONS.CLEAR:
        return{
            
        }
    case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand==null){
            return state
        }
        if(state.previousOperand==null){
            return{
                ...state,
                operation:payload.operation,
                previousOperand: state.currentOperand,
                currentOperand: null,
            }
        }
        if(state.previousOperand!=null&&state.currentOperand==null&&state.operation!=null){
            return{
                ...state,
            operation:payload.operation
            }
        }
         return  {
            ...state,
            previousOperand: evaluate(state),
            operation:  payload.operation,
            currentOperand:null,
            
            
         } 
    case ACTIONS.EVAULATE:
        if(state.currentOperand == null && state.previousOperand==null){
                return state
            }
        if(state.previousOperand==null){
                return state
            }
         return  {
                ...state,
                previousOperand:null ,
                operation:  payload.operation,
                currentOperand:evaluate(state),
                overwrite:true
             } 
    case ACTIONS.DELETE_DIGIT:
    if(state.currentOperand==null&&state.previousOperand==null)
        {
            return state
        } 
    if(state.previousOperand==null){
        return{
            ...state,
            currentOperand:state.currentOperand.slice(0,(state.currentOperand.length-1))
        }
    }
    if(state.previousOperand!=null&&state.currentOperand!=null){
        return{
            ...state,
            currentOperand:state.currentOperand.slice(0,(state.currentOperand.length-1))
        }
    }
    if(state.currentOperand==null){
        return{
...state,
currentOperand:state.previousOperand,
previousOperand:null,
operation:null
        }
    }
    return(state)
      
    
}
}
function evaluate({previousOperand,currentOperand,operation}){
const prev = parseFloat(previousOperand)
const current= parseFloat(currentOperand)

if (isNaN(prev)|| isNaN(current)){
    return ''   
}
let computation=''
switch(operation){
    case '+':
        computation=prev+current
        break
    case '-':
        computation=prev-current
        break
    case 'x':
        computation=prev*current
        break
    case '÷':
        computation=prev/current
        break
}
return computation

}
export default function Click(){
    const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
    return(
        
        <div className='Main'>
            <div className='Calculator-grid'>
            
            <div className='output'>
                <div className='previous-oprand'>{previousOperand}{operation}</div>
                <div className='current-oprand'>{currentOperand}</div>
            </div>
           <button onClick={()=>dispatch({type: ACTIONS.CLEAR})} className='span-two' >AC</button>
           <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
           <OperationButton operation='÷' dispatch={dispatch}/>
           <DigitButton digit='1' dispatch={dispatch}/>
           <DigitButton digit='2' dispatch={dispatch}/>
           <DigitButton digit='3' dispatch={dispatch}/>
           <OperationButton operation='x' dispatch={dispatch}/>
           <DigitButton digit='4' dispatch={dispatch}/>
           <DigitButton digit='5' dispatch={dispatch}/>
           <DigitButton digit='6' dispatch={dispatch}/>
           <OperationButton operation='+' dispatch={dispatch}/>
           <DigitButton digit='7' dispatch={dispatch}/>
           <DigitButton digit='8' dispatch={dispatch}/>
           <DigitButton digit='9' dispatch={dispatch}/>
           <OperationButton operation='-' dispatch={dispatch}/>
           <DigitButton digit='.' dispatch={dispatch}/>
           <DigitButton digit='0' dispatch={dispatch}/>
          
           <EvaluateButton  operation='=' dispatch={dispatch}/>

        </div>
        </div>
        
    )
}
