import { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

const API_URL = process.env.API_URL + 'api/todos'

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <TextInput
        placeholder="New todo"
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
  container: { padding: 20, marginTop: 40 },
  header: { fontSize: 26, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  todo: {
    padding: 10,
    borderBottomWidth: 1,
  },
})
