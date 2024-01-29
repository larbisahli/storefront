// Original file: app/proto/shipping.proto

export interface ShippingRequest {
  alias?: string
  suid?: string
  _suid?: 'suid'
}

export interface ShippingRequest__Output {
  alias: string
  suid?: string
  _suid: 'suid'
}
