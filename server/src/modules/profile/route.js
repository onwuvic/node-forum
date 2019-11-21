import express from 'express';
import ProfileController from './ProfileController';


const profileRouter = express.Router();

profileRouter.get('/profiles/:username', ProfileController.show);

export default profileRouter;
