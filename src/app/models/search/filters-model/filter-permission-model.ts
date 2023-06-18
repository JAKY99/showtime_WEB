import {PermissionModel} from "../../Authorities/permission-model";

export interface FilterPermissionModel {
  displayName: DisplayName,
  permissions : Permission,
  description: Description
}

interface DisplayName {
  matchMode: string | null | undefined,
  value: string | null
}

interface Permission{
  matchMode: string | null | undefined,
  value: Array<PermissionModel>
}

interface Description{
  matchMode: string | null | undefined,
  value: string | null
}


