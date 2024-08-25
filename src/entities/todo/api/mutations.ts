import { ToDoDto } from '@/shared/api';
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { todoApi } from './api';

const mutations = {
  putTodosById: () => ({
    mutationFn: (variables: TPutTodosByIdVariables) => {
      const { id, body } = variables;
      return todoApi.putTodosById(id, body);
    },
    mutationKey: ['todos'],
  }),
  deleteTodosById: () => ({
    mutationFn: (variables: TDeleteTodosByIdVariables) => {
      const { id } = variables;
      return todoApi.deleteTodosById(id);
    },
    mutationKey: ['todos'],
  }),
};

/**
 * @tags todo
 * @summary ID를 사용해 TODO 내용을 수정합니다.
 * @request PUT:/todos/{id}*/
export const usePutTodosByIdMutation = (
  options?: Omit<
    UseMutationOptions<ToDoDto, DefaultError, TPutTodosByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.putTodosById(),
    ...options,
  });
};

/**
 * @tags todo
 * @summary ID에 해당하는 TODO를 제거합니다.
 * @request DELETE:/todos/{id}*/
export const useDeleteTodosByIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TDeleteTodosByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteTodosById(),
    ...options,
  });
};

type TPutTodosByIdVariables = { id: number; body: ToDoDto };
type TDeleteTodosByIdVariables = { id: number };
