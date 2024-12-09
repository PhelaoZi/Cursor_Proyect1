'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      ))
      setEditingId(null)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="mr-2"
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
              {editingId === todo.id ? (
                <Input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="mr-2"
                />
              ) : (
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
              )}
              <div>
                {editingId === todo.id ? (
                  <Button onClick={saveEdit} size="sm" variant="outline">
                    <Check className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={() => startEditing(todo.id, todo.text)} size="sm" variant="outline">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
                <Button onClick={() => deleteTodo(todo.id)} size="sm" variant="outline" className="ml-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button onClick={() => toggleComplete(todo.id)} size="sm" variant="outline" className="ml-2">
                  {todo.completed ? 'Undo' : 'Done'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500">
        © 2023 Todo List App. All rights reserved.
      </CardFooter>
    </Card>
  )
}

