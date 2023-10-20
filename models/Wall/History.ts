import { WallItemBase } from '.'
import { HISTORY } from '@/constants/Wall'
import { TITLE, DESCRIPTION, INITIAL_ASSESSMENT, COLUMN_ID, ROW_ID, TASK_TYPE_ID, DESK_ID, PERFORMER_ID, TAGS, FILES } from '@/constants/History'

export type UpdatableFields = typeof TITLE | typeof DESCRIPTION |
                              typeof INITIAL_ASSESSMENT | typeof COLUMN_ID |
                              typeof ROW_ID | typeof TASK_TYPE_ID |
                              typeof DESK_ID | typeof PERFORMER_ID |
                              typeof TAGS | typeof FILES

export default interface History extends WallItemBase {
  updatedFields: UpdatableFields[];
  fieldsValues: string[];
  previousValues: string[];
  type: typeof HISTORY
}
