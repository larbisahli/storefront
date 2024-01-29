// Original file: app/proto/payment.proto

export interface StipePaymentRequest {
  alias?: string
  suid?: string
  _suid?: 'suid'
}

export interface StipePaymentRequest__Output {
  alias: string
  suid?: string
  _suid: 'suid'
}
