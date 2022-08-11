<template>
  <div class="task-view">
 <div class="name">
      <input
        class="size" 
        placeholder="Enter Task Name"
        :value = "task.name"
        @change = "updateTask($event, 'name')"
      />
    </div>
    <div class="Disc">
      <textarea
      placeholder="Enter task description"
           :value="task.description"
           cols = 50
           rows= 20
           @change="updateTask($event, 'description')"
           />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed: {...mapGetters(['getTask']),
   task(){
    return this.getTask(this.$route.params.id)
   }},
   methods:{
     updateTask(e,key){
       this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
       })
     }
   }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
.name{
 width: 100%;
}

.Disc{
   height: fit-content;
   width: 100%;
  }
.Disc1{
  height: fit-content;
}
.size{
  width: 100%;
  border: none
}

</style>
