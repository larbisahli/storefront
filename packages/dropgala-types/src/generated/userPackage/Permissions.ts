// Original file: app/proto/user.proto

export interface Permissions {
  write?: boolean
  read?: boolean
  update?: boolean
  delete?: boolean
}

export interface Permissions__Output {
  write: boolean
  read: boolean
  update: boolean
  delete: boolean
}
