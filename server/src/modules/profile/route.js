import express from 'express';
import ProfileController from './ProfileController';


const profileRouter = express.Router();

profileRouter.get('/profiles/:username', ProfileController.show);
// WILL Remove this once adding activity children is figured out.
profileRouter.get('/activity', ProfileController.findAll);

export default profileRouter;
