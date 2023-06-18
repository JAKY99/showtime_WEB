export interface PermissionModel {
  id: number,
  permission: string,
  displayName: string,
  description: string
}

export interface PermissionNoIdModel {
  permission: string,
  displayName: string,
  description: string
}
