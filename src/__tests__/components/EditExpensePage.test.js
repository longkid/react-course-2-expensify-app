import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let history, editExpense, removeExpense, expense, wrapper;

beforeEach(() => {
  history = { push: jest.fn() }
  editExpense = jest.fn();
  removeExpense = jest.fn();
  expense = expenses[0];
  wrapper = shallow(
    <EditExpensePage
      history={history}
      editExpense={editExpense}
      removeExpense={removeExpense}
      expense={expense}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpense).toHaveBeenCalledWith(expense.id, expense);
  expect(history.push).toHaveBeenCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(removeExpense).toHaveBeenCalledWith({ id: expense.id });
  expect(history.push).toHaveBeenCalledWith('/');
});