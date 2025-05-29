import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoList = () => {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getTodos(token);
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleFormSubmit = async (todoData) => {
    try {
      if (editingTodo) {
        const updatedTodo = await updateTodo(token, editingTodo.id, todoData);
        setTodos(todos.map(todo => 
          todo.id === editingTodo.id ? updatedTodo : todo
        ));
      } else {
        const newTodo = await createTodo(token, todoData);
        setTodos([...todos, newTodo]);
      }
      setShowForm(false);
      setEditingTodo(null);
    } catch (err) {
      console.error('Error saving todo:', err);
      setError('Failed to save task. Please try again.');
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(token, id);
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (err) {
        console.error('Error deleting todo:', err);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        const updatedTodo = await updateTodo(token, id, { 
          ...todoToUpdate,
          completed 
        });
        setTodos(todos.map(todo => 
          todo.id === id ? updatedTodo : todo
        ));
      }
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Adicionar Nova Tarefa
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {showForm && (
        <div className="mb-6">
          <TodoForm 
            todo={editingTodo} 
            onSubmit={handleFormSubmit} 
            onCancel={handleFormCancel} 
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Carregando tarefas...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Nenhuma tarefa encontrada. Adicione uma nova tarefa para começar!</p>
        </div>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList; 