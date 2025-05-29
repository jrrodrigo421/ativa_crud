import React, { useState, useEffect } from 'react';

const TodoForm = ({ todo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });

  // Initialize form if editing a todo
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        completed: todo.completed || false
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {todo ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
          placeholder="Enter task title"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
          placeholder="Enter task description (optional)"
        />
      </div>
      
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="h-4 w-4 text-primary focus:ring-primary-light border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-gray-700">
          Mark as completed
        </label>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
        >
          {todo ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm; 