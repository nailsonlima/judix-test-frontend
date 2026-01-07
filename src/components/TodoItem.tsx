import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '@/hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`
        group flex items-center justify-between p-4 mb-3 rounded-lg border transition-all duration-200
        ${
          todo.completed
            ? 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-800'
            : 'bg-white border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700'
        }
      `}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 transition-colors duration-200
            ${
              todo.completed
                ? 'text-green-500 hover:text-green-600'
                : 'text-gray-400 hover:text-blue-500'
            }
          `}
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <span
          className={`
            text-base transition-all duration-200
            ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-700 dark:text-gray-200'
            }
          `}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
