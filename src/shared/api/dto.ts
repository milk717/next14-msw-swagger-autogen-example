export interface ToDoDto {
  /**
   * The unique ID of the task
   * @example 1
   */
  id: number;
  /**
   * The title of the task
   * @example "피아노 연습하기"
   */
  title: string;
  /**
   * A detailed description of the task
   * @example "다음 주 레슨을 위한 연습하기"
   */
  description?: string;
  /**
   * The status of the task
   * @example "PENDING"
   */
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface ErrorResponseDto {
  /**
   * The HTTP status code
   * @example 400
   */
  code: number;
  /**
   * The error name
   * @example "Bad Request"
   */
  name: string;
  /**
   * A detailed error message
   * @example "The request was invalid."
   */
  message: string;
}
