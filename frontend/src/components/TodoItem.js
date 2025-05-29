import React from 'react';

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`border rounded-lg p-4 mb-3 shadow-sm ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, !todo.completed)}
            className="mt-1 h-5 w-5 text-primary focus:ring-primary-light rounded"
          />
          <div>
            <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(todo.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 