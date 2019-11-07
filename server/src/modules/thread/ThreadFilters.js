/* eslint-disable class-methods-use-this */
import ThreadService from './ThreadService';

class ThreadFilters {
  static async filter(query) {
    let threads;
    // eslint-disable-next-line no-restricted-syntax
    for (const filter of ThreadFilters.getFilters(query)) {
      // manual check. this will be refactored soon
      if (filter === 'by') {
        // eslint-disable-next-line no-await-in-loop
        threads = await ThreadFilters.by(query[filter]);
      }
    }

    // await Promise.all(threads);
    return threads;
  }

  static getFilters(query) {
    const filters = ['by'];
    return filters.filter(filter => filter in query);
  }

  static async by(username) {
    const threads = await ThreadService.findAllByUser(username);
    return threads;
  }
}

export default ThreadFilters;
