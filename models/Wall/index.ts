import Comment from './Comment'
import History from './History'
import SpentTime from './SpentTime'

import { SPENT_TIME, COMMENT, HISTORY } from '@/constants/Wall'

export type WallItemType = typeof SPENT_TIME | typeof COMMENT | typeof HISTORY

export interface WallItemBase {
  id: string;
  createdAt: Date;
  userId: string;
  type: WallItemType
}

export type WallItem = Comment | History | SpentTime
