/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import ThreadService from './ThreadService';

class ThreadFilters {
  static async filter(query) {
    const filters = ThreadFilters.getFilters(query);
    
    if (filters.length) {
      for (const filter of filters) {
        // manual check. this will be refactored soon
        if (filter === 'by') {
          const resource = await ThreadFilters.by(query[filter]);
          if (!resource) {
            return { status: false, message: 'Filter User doesn\'t exist' };
          }
          return { status: true, resource };
        }
        if (filter === 'popular') {
          const resource = await ThreadFilters.popular();
          return { status: true, resource };
        }
      }
    }
    return { status: false, message: 'Incorrect filter parameters' };
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
