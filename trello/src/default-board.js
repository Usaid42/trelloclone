import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'First task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Fecond task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'Eat',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'Sleep',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
