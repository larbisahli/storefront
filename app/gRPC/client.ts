import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

import { ProtoGrpcType } from '@proto/generated/serviceRoutes'

const PROTO_PATH = path.join(process.cwd(), './proto/serviceRoutes.proto')

export const RPCStoreFrontPort = '0.0.0.0:50052'

export const { createInsecure } = grpc.credentials

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  oneofs: true,
  longs: String,
  enums: String
})

export const { CategoryServiceRoutes, SliderServiceRoutes } = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).ServiceRoutes
