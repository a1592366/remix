import { attached, detached, updated, events } from 'remixjs/worker';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    node: {
      type: Object,
      value: null
    }
  },

  data: {},
  detached,
  attached,
  methods: { 
    ...events,
    $updated: updated
  }
})