import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { ToDoDto } from '@/shared/api';
import { todoApi } from './api';

export const TODO_QUERY_KEY = {
  GET_TODOS: () => ['todos'],
  GET_TODOS_ID: (id: number) => ['todos', id],
};

const queries = {
  getTodos: () => ({
    queryKey: TODO_QUERY_KEY.GET_TODOS(),
    queryFn: () => todoApi.getTodos(),
  }),
  getTodosById: (id: number) => ({
    queryKey: TODO_QUERY_KEY.GET_TODOS_ID(id),
    queryFn: () => todoApi.getTodosById(id),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags todo
 * @summary 모든 TODO 리스트 목록을 조회합니다.
 * @request GET:/todos*/
export const useGetTodosQuery = <TData = ToDoDto[],>(
  options?: Omit<
    UseQueryOptions<ToDoDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getTodos(),
    ...options,
  });
};
/**
 * @tags todo
 * @summary ID를 사용해 TODO 리스트를 단건 조회합니다.
 * @request GET:/todos/{id}*/
export const useGetTodosByIdQuery = <TData = ToDoDto,>(
  id: number,
  options?: Omit<
    UseQueryOptions<ToDoDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getTodosById(id),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags todo
 * @summary 모든 TODO 리스트 목록을 조회합니다.
 * @request GET:/todos*/
export const useSuspenseGetTodosQuery = <TData = ToDoDto[],>(
  options?: Omit<
    UseSuspenseQueryOptions<ToDoDto[], DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getTodos(),
    ...options,
  });
};
/**
 * @tags todo
 * @summary ID를 사용해 TODO 리스트를 단건 조회합니다.
 * @request GET:/todos/{id}*/
export const useSuspenseGetTodosByIdQuery = <TData = ToDoDto,>(
  id: number,
  options?: Omit<
    UseSuspenseQueryOptions<ToDoDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getTodosById(id),
    ...options,
  });
};
