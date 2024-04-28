import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"


export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } }

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}
const localStorageExpenses = (): Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

export const InitialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const BudgetReducer = (
    state: BudgetState = InitialState,
    actions: BudgetActions
) => {

    if (actions.type === 'add-budget') {
        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if (actions.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (actions.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (actions.type === 'add-expense') {

        const expense = createExpense(actions.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }
    if (actions.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter((expense) => expense.id !== actions.payload.id)
        }
    }

    if (actions.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: actions.payload.id,
            modal: true
        }
    }

    if (actions.type === 'update-expense') {

        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === actions.payload.expense.id ? actions.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if (actions.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if(actions.type === 'add-filter-category'){
        return{
            ...state,
            currentCategory: actions.payload.id
        }
    }

    return state
}