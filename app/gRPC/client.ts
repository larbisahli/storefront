import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

import { ProtoGrpcType } from '@gRPC/generated/serviceRoutes'

// const PROTO_PATH = path.join(path.resolve('./'), 'proto/serviceRoutes.proto')

const PROTO_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files in the build

console.log({ PROTO_PATH })

export const RPCStoreFrontPort = '172.31.32.155:50052' //'0.0.0.0:50052'

export const { createInsecure } = grpc.credentials

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(
  `${PROTO_PATH}/serviceRoutes.proto`,
  {
    keepCase: true,
    defaults: false,
    arrays: true,
    oneofs: true,
    longs: String,
    enums: String
  }
)

export const {
  CategoryServiceRoutes,
  SliderServiceRoutes,
  ProductServiceRoutes,
  ConfigServiceRoutes
} = (grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType)
  .ServiceRoutes
