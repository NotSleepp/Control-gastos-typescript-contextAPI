import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetReducer, BudgetState, InitialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBugdet: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(BudgetReducer, InitialState)
    
    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense)=> expense.amount + total, 0) ,[state.expenses])
    const remainingBugdet = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state, dispatch, totalExpenses, remainingBugdet
            }} >
            {children}
        </BudgetContext.Provider>
    )
}