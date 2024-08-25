import { getDehydratedQueryClientByQueries } from '@/shared/lib/dehydrated-query-client';
import { TODO_QUERY_KEY } from '@/entities/todo/api/queries';
import { todoApi } from '@/entities/todo/api/api';
import { HydrationBoundary } from '@tanstack/react-query';
import { TodoList } from '@/widgets/todo-list/ui/todo-list';

const HomePage = async () => {
  const dehydratedQueries = await getDehydratedQueryClientByQueries([
    {
      queryKey: TODO_QUERY_KEY.GET_TODOS(),
      queryFn: () => todoApi.getTodos(),
    },
  ]);

  return (
    <main className="py-2">
      <h1 className="mb-2 text-2xl font-bold text-slate-800">Todo List</h1>
      <HydrationBoundary state={{ queries: dehydratedQueries }}>
        <TodoList />
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
