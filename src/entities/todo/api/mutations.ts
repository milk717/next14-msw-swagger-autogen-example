import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';

import { todoApi } from './api';

const mutations = {
  deleteTodosById: () => ({
    mutationFn: (variables: TDeleteTodosByIdVariables) => {
      const { id } = variables;
      return todoApi.deleteTodosById(id);
    },
    mutationKey: ['todo'],
  }),
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

type TDeleteTodosByIdVariables = { id: number };
