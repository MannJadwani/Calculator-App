
import{ ACTIONS } from './Click.js'
export default function EvaluateButton({dispatch,operation }) {
return (
<button className='span-two'
onClick={()=> dispatch({ type: ACTIONS.EVAULATE, payload: { operation } })}>
{operation}
</button>
)
}