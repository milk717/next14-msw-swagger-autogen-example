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
  async getTodos() {
    return this.instance.get(`todos`, {}).json<ToDoDto[]>();
  }

  /**
   * @tags todo
   * @summary ID를 사용해 TODO 리스트를 단건 조회합니다.
   * @request GET:/todos/{id}*/
  async getTodosById(id: number) {
    return this.instance.get(`todos/${id}`, {}).json<ToDoDto>();
  }

  /**
   * @tags todo
   * @summary ID를 사용해 TODO 내용을 수정합니다.
   * @request PUT:/todos/{id}*/
  async putTodosById(id: number, data: ToDoDto) {
    return this.instance
      .put(`todos/${id}`, {
        json: data,
      })
      .json<ToDoDto>();
  }

  /**
   * @tags todo
   * @summary ID에 해당하는 TODO를 제거합니다.
   * @request DELETE:/todos/{id}*/
  async deleteTodosById(id: number) {
    return this.instance.delete(`todos/${id}`, {}).json<void>();
  }
}

const todoApi = new TodoApi(apiInstance);

export { todoApi };
