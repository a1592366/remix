const fs = require('fs-extra');
const path = require('path');

// const { getContext } = require('./context');

class Project {
  static createProject (mode) {
    return new Project(mode);
  }

  constructor (mode) {
    this.mode = mode;
  }

  get pages () {
    const { router } = this.context;

    if (router) {
      const { routes } = router;
      return routes.map(route => route.path);
    } else {
      logger.orange(``)
    }
  }

  get tabbar () {
    const { tabbar } = this.context;

    if (tabbar) {

    } else {

    }
  }

  async distroy () {
    // await fs.remove();
    // await fs.mkdir();
  }

  async build () {

  }
}

module.exports = {
  Project,
  createProject () {
    return new Project()
  }
};