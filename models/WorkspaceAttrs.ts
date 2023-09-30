import Desk from '@/models/Desk'
import Member from '@/models/Member'
import Row from '@/models/Row'
import Tag from '@/models/Tag'
import TaskType from '@/models/TaskType'
import Column from '@/models/Column'

export default interface WorkspaceAttrs {
  desks: Desk[];
  rows: Row[];
  columns: Column[];
  tags: Tag[];
  taskTypes: TaskType[];
  members: Member[];
}
