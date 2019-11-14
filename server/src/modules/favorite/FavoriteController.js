class FavoriteController {
  static async index(req, res) {
    res.status(200).json('Its works!!! Favorites');
  }

  static async favoriteReply(req, res) {
    // authId (req.user), favoritedId (req.params.replyId), favoritedType ('Reply')
    res.status(200).json('it works');
  }
}

export default FavoriteController;
