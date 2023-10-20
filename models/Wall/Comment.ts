import { WallItemBase } from '.'
import { COMMENT } from '@/constants/Wall'

export default interface Comment extends WallItemBase {
  text: string;
  type: typeof COMMENT
}
