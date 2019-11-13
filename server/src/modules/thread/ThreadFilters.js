/* eslint-disable class-methods-use-this */
import ThreadService from './ThreadService';

class ThreadFilters {
  static async filter(query) {
    // let threads;
    // eslint-disable-next-line no-restricted-syntax
    for (const filter of ThreadFilters.getFilters(query)) {
      // manual check. this will be refactored soon
      if (filter === 'by') {
        // eslint-disable-next-line no-await-in-loop
        const threads = await ThreadFilters.by(query[filter]);
        return threads;
      }
      if (filter === 'popular') {
        // eslint-disable-next-line no-await-in-loop
        const threads = await ThreadFilters.popular();
        return threads;
      }
    }
  }

  static getFilters(query) {
    const filters = ['by', 'popular'];
    return filters.filter(filter => filter in query);
  }

  static async by(username) {
    const threads = await ThreadService.findAllByUser(username);
    return threads;
  }

  static async popular() {
    const threads = await ThreadService.findAllByPopular();
    return threads;
  }
}

export default ThreadFilters;
