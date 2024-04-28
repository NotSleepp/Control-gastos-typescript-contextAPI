import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudgets";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


export default function BudgetTracker() {
  const { state, totalExpenses, remainingBugdet, dispatch } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button type="button" className="bg-pink-600 w-full p-2 text-white uppercase rounded-lg" onClick={()=>dispatch({type:'reset-app'})}>Recetear App</button>
        <AmountDisplay
          label='Presupuesto'
          amount={state.budget}
        />
        <AmountDisplay
          label='Disponible'
          amount={remainingBugdet}
        />
        <AmountDisplay
          label='Gastado'
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
