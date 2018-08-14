import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add new expense', () => {
  const addedExpense = expenses[0];
  const action = {
    type: 'ADD_EXPENSE',
    expense: addedExpense
  };
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([addedExpense]);
});

test('should remove expense by id', () => {
  const removedExpense = expenses[1];
  const action = {
    type: 'REMOVE_EXPENSE',
    id: removedExpense.id
  };
  const state = expensesReducer(expenses, action);
  expect(state).not.toContainEqual(removedExpense);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit expense', () => {
  const editedExpense = expenses[0];
  const action = {
    type: 'EDIT_EXPENSE',
    id: editedExpense.id,
    updates: {
      note: 'This is the updated expense'
    }
  };
  const expectedExpense = Object.assign({}, editedExpense, action.updates);
  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual(expectedExpense);
});

test('should not edit an expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'This is the updated expense'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});