import { useEffect, useState } from 'react'
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const API_URL = 'https://test-tawny-chi-28.vercel.app/api/todos'

type Todo = {
  id: string
  title: string
  completed: boolean
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')

  const loadTodos = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setTodos(data)
  }

  const addTodo = async () => {
    if (!title.trim()) return

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })

    setTitle('')
    loadTodos()
  }

  useEffect(() => {
    loadTodos()
  }, [])

  console.log('API_URL:', API_URL)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <TextInput
        placeholder="New todo"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Button title="Add" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.todo}>{item.title}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 26,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  todo: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: 'white',
  },
})
