import { WallItemBase } from '.'
import { SPENT_TIME } from '@/constants/Wall'

export default interface SpentTime extends WallItemBase {
  spentTime: number;
  type: typeof SPENT_TIME
}
