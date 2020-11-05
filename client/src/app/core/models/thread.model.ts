import { Channel } from './channel.model';
import { User } from './user.model';
import { Reply } from './reply.model';

export interface Thread {
  id: number;
  title: string;
  body: string;
  userId: number;
  channelId: number;
  replyCount: string | number;
  createdAt: string;
  updatedAt: string;
  channel?: Channel;
  creator?: User;
  replies?: Reply[];
}
