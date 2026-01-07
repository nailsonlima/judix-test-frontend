import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('taskzen_todos');
    if (storedTodos) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskzen_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    activeCount,
  };
}
