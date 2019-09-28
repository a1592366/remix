import { events, attached, detached } from 'remixjs/worker';
Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    children: {
      type: Array,
      value: []
    },
    id: {
      type: String,
      value: null
    },
    nodeId: {
      type: String,
      value: null
    },
    node: {
      type: Object,
      value: null
    }
  },

  attached, 
  detached,

  data: {},

  methods: {
    ...events
  }
})