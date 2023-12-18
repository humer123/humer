<template>
  <div class="container">
    <div class="title"><h1>Todo App</h1></div>
    <div class="actions">
      <form @submit="addTask">
        <input type="text" class="input" placeholder="Add Task" v-model="task" required>
        <button type="submit">Add</button>
        <!-- <input type="text" placeholder="search task"> -->
      </form>
    </div>
    <div class="tasks">
      <div class="task-items" v-for="todo in todos" :key="todo.id">
        <p :class="todo.status == true ? 'isDone':'text'">{{ todo.details }}</p>
        <button class="done-btn"  @click="markAsDone(todo.id)">Done</button>
        <button class="remove-btn"   @click="removeTask(todo.id)">Remove</button>
      </div>
      <!-- <button class="clear-btn">Clear ALL task</button> -->
    </div>
  </div>
  
</template>

<script>
import {db} from './firebase'
import { collection, query, onSnapshot,addDoc, orderBy, serverTimestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from 'uuid'
export default {
  data(){
    return{
      task:'',
      todos:[
      ]
    }
  },
  methods:{
    async addTask(e){
      e.preventDefault();
      // const newTask = {
      //   id:uuidv4(),
      //   details:this.task,
      //   status:false
      // }
      // this.todos.unshift(newTask);
      // this.task=''
      try{
          await addDoc(collection(db, "todos"), {
          todo: this.task,
          status: false,
          date_created: serverTimestamp()
        });
        this.task=''
      }catch(e){
        console.log(e);
      }
    },
    removeTask(id){
      // const index = this.todos.findIndex(todo => todo.id === id);
      // if (index !== -1) {
      //   this.todos.splice(index, 1);
      // }
      const fsquery = doc(db, 'todos', id);
      deleteDoc(fsquery)
      .then(() => {
          console.log('Document successfully deleted.');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
      

    },
    // async getData(){
    //   const querySnapshot = await getDocs(collection(db, "todos"));
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     const todo = {
    //       id:doc.id,
    //       details:doc.data().todo,
    //       status:doc.data().status
    //     }
    //     this.todos.push(todo);
    //   });
    // }
    getRealTimeData(){
      const q = query(collection(db, "todos"), orderBy('date_created','desc'));
      onSnapshot(q, (querySnapshot) => {
        const newTask = [];
        querySnapshot.forEach((doc) => {
              const todo = {
              id:doc.id,
              details:doc.data().todo,
              status:doc.data().status
            }
            newTask.push(todo);
        });
        this.todos=newTask;

      });
    },
    markAsDone(id){
      const fsquery = doc(db, 'todos', id);
      const newData = {
        status:true
      }
      updateDoc(fsquery, newData)
      .then(() => {
        console.log('Document successfully updated.');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
    }
  },
  mounted(){
    this. getRealTimeData();
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
  /* margin-top: 60px; */
}
.container{
  border:1px solid;
  border-radius: 5px;
  width: 300px;
  padding:20px;
  margin:0 auto;
  text-align: center;
}
.task-items{
  display: flex;
  padding:5px;
  width: 270px;
  border:1px solid #666;
  margin: 5px;
  align-items: center;
  border-radius: 5px;
}
.task-items:hover{
background-color: #ccc;
cursor: pointer;
}
.remove-btn{
  background-color: red;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  margin-right: 10px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
}
.done-btn{
  background-color: blue;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
  margin-left: auto;
}
.clear-btn{
  background-color: black;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
  margin-left: auto;
}
.input{
  border: 1px solid;
    border-radius: 5px;
    padding:5px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
}
.isDone{
  text-decoration: line-through;
}
</style>
