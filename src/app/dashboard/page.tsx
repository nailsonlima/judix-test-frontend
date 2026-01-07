'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from '@/components/TodoItem';
import { LogOut, Plus, ListTodo } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { todos, addTodo, toggleTodo, deleteTodo, filter, setFilter, activeCount } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();

  // Redirect if not logged in (basic client-side protection)
  // In a real app, middleware or server-side checks would be better.
  React.useEffect(() => {
    if (!localStorage.getItem('taskzen_user')) {
      router.push('/login');
    }
  }, [router]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  if (!user && typeof window !== 'undefined' && !localStorage.getItem('taskzen_user')) {
      return null; // Or loading spinner
  }

  const displayName = user?.name || 'User';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskZen</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Hello, <b>{displayName}</b>
            </span>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          
          {/* Input Area */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <form onSubmit={handleAdd} className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={!newTodo.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
            </span>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize
                    ${
                      filter === f
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="p-6 min-h-[300px] max-h-[600px] overflow-y-auto">
            {todos.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                 <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <ListTodo className="h-8 w-8 text-gray-300 dark:text-gray-500" />
                 </div>
                 <p className="text-lg font-medium">No tasks yet</p>
                 <p className="text-sm">Add a task above to get started</p>
              </div>
            ) : (
              todos.map((todo) => (
                 <TodoItem
                   key={todo.id}
                   todo={todo}
                   onToggle={toggleTodo}
                   onDelete={deleteTodo}
                 />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
