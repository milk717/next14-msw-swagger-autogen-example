import { KyInstance } from 'ky';

import { ToDoDto, apiInstance } from '@/shared/api';

export class TodoApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  /**
   * @tags todo
   * @summary 모든 TODO 리스트 목록을 조회합니다.
   * @request GET:/todos*/
  getTodos(kyInstance?: KyInstance) {
    const instance = kyInstance ?? this.instance;

    return instance.get<ToDoDto[]>(`todos`, {}).json();
  }

  /**
   * @tags todo
   * @summary ID를 사용해 TODO 리스트를 단건 조회합니다.
   * @request GET:/todos/{id}*/
  getTodosById(id: number, kyInstance?: KyInstance) {
    const instance = kyInstance ?? this.instance;

    return instance.get<ToDoDto>(`todos/${id}`, {}).json();
  }

  /**
   * @tags todo
   * @summary ID를 사용해 TODO 내용을 수정합니다.
   * @request PUT:/todos/{id}*/
  putTodosById(id: number, data: ToDoDto, kyInstance?: KyInstance) {
    const instance = kyInstance ?? this.instance;

    return instance
      .put<ToDoDto>(`todos/${id}`, {
        json: data,
      })
      .json();
  }

  /**
   * @tags todo
   * @summary ID에 해당하는 TODO를 제거합니다.
   * @request DELETE:/todos/{id}*/
  deleteTodosById(id: number, kyInstance?: KyInstance) {
    const instance = kyInstance ?? this.instance;

    return instance.delete<void>(`todos/${id}`, {}).json();
  }
}

const todoApi = new TodoApi(apiInstance);

export { todoApi };
