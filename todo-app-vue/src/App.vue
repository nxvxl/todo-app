<template>
  <div id="app">
    <h1>Todo App Vue</h1>
    <form @submit.prevent="addTodo()" class="form">
      <input v-model="newTodo"/>
      <button type="submit">+</button>
    </form>
    <div class="todos">
      <ul>
        <span class="todo-item" v-for="(todo, index) in todos" :key="index">
          <li>{{ todo }}</li>
          <button @click="deleteTodo(index)">x</button>
        </span>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo) return;
      this.todos.push(this.newTodo);
      this.newTodo = '';
      this.storeTodos();
    },
    deleteTodo(i) {
      this.todos.splice(i, 1);
      this.storeTodos();
    },
    storeTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  },
  mounted() {
    const localTodos = localStorage.getItem('todos')
    if (localTodos) this.todos = JSON.parse(localTodos)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input, button {
  padding: 10px;
  border: none;
  font-weight: 500;
}

button {
  cursor: pointer;
  background: #444;
  color: white;
}
.todos {
  max-width: 400px;
  margin: auto;
  font-size: 1.2rem;
}
.todo-item {
  margin: 6px;
  border: 2px solid #42b983;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.todo-item li {
  padding: 4px;
}

.todo-item button {
  background: #42b983;
  width: 2rem;
}
</style>
