'use client';

import { useDeleteTodosByIdMutation, usePutTodosByIdMutation } from '@/entities/todo/api/mutations';
import { useGetTodosQuery } from '@/entities/todo/api/queries';
import { Spinner } from '@nextui-org/spinner';
import { Button } from '@nextui-org/button';
import { ToDoDto } from '@/shared/api';
import { Checkbox } from '@nextui-org/checkbox';

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const { mutate: deleteTodo } = useDeleteTodosByIdMutation();
  const { mutate: updateTodo } = usePutTodosByIdMutation();

  const handleDelete = (id: number) => {
    deleteTodo({ id });
  };

  const handleStatusChange = (todo: ToDoDto) => {
    const newStatus = todo.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    updateTodo({ id: todo.id, body: { ...todo, status: newStatus } });
  };

  if (isLoading) return <Spinner size="lg" />;

  return (
    <div>
      {todos?.map((todo, index) => (
        <div key={index} className="border-b py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                isSelected={todo.status === 'COMPLETED'}
                onChange={() => handleStatusChange(todo)}
                color="success"
                size="lg"
              >
                <div className="ps-2">
                  <h4 className="text-large font-bold">{todo.title}</h4>
                  <small className="text-default-500">{todo.description}</small>
                </div>
              </Checkbox>
            </div>
            <Button size="sm" color="danger" onClick={() => handleDelete(todo.id)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { TodoList };
