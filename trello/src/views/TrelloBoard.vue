<template>
  <div class="board">
    <div  class="random">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
      @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
      @dragover.prevent
      @dragenter.prevent
      @dragstart.self="pickupColumn($event, $columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
             draggable
               @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
      @dragenter.prevent
      @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
          >
            <span class="Name">
              {{ task.name }}
            </span>
            <div>
               <p
              v-if="task.description"
              class="Disc"
            >
              {{ task.description }}
            </p>
            </div>
          </div>
          <input
                type="text"
                class="trans"
                placeholder="+ Enter new task"
                @keyup.enter="newTask($event, column.tasks)"
              />
        </div>
      </div>
      
        <input type="text" 
        class="column"
        v-model= newColumnName
        placeholder="+ Create new column"
        @keyup.enter="createNewColumn()"
        />
    </div>
    <div class = "task-bg" v-if = "isTaskOpen" @click.self = "close">
         <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
     return{
      newColumnName : ''
     }
  },

  computed: {...mapState(['board']), 
  isTaskOpen(){return this.$route.name === 'task'}
  },
 methods:{ 
  
  goToTask(task){
     this.$router.push({name: 'task', params: {id: task.id}})
  },
  close(){
    this.$router.push({name: 'board'})
  },
  newTask(e,tasks){
        this.$store.commit('CREATE_TASK', {
          tasks,
          name: e.target.value
       })
       e.target.value = ''
    },
     pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task') // 
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    moveTask (e, toTasks, toTaskIndex) { 
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex, 
        toTasks,
        toTaskIndex 
      })
    },
    createNewColumn(){
      this.$store.commit('CREATE_COLUMN',{name: this.newColumnName})
      this.newColumnName = ''
    } 
}}
</script>

<style lang="css">
.task {
  @apply items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white no-underline;
  max-height: 60px;
  overflow: hidden;
  
}
.trans{
  background: transparent;
  
}
.Name{
  font-style: Bold;
  font-size: larger
}

.disc{
   
   font-size:xx-small;
}

.column {
  @apply p-2 bg-lime-400 text-left shadow rounded;
  min-width: 350px;
  height: fit-content;
  margin: 5px
}

.random{
  display: flex;

}

.board {
  @apply p-4 bg-teal-300 h-full overflow-auto;
  overflow: auto;
}

.task-bg {
  background: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  padding-top: 1px; /* Location of the box */
  left: 0;
  top: 0;
}
</style>
