import WorkspaceAttrs from '@/models/WorkspaceAttrs'

export default interface Workspace extends WorkspaceAttrs {
  id: string;
  createdAt: number;
  name: string;
}
