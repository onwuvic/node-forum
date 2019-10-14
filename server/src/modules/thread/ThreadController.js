import ThreadService from './ThreadService';

class ThreadController {
  static async index(req, res) {
    try {
      const threads = await ThreadService.findAll();
      res.status(200).json(threads);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async show(req, res) {
    try {
      const thread = await ThreadService.findOne(req.params.id);
      res.status(200).json(thread);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default ThreadController;
