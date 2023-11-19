import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

import { ProtoGrpcType } from '@gRPC/generated/serviceRoutes'

const isProd = process.env.NODE_ENV === 'production'

// const PROTO_PATH = path.join(path.resolve('./'), 'proto/serviceRoutes.proto')
const PROTO_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

// GRPC_PROD_IP should be a private IP address
export const RPCStoreFrontPort = (
  isProd ? process.env.GRPC_PROD_IP : process.env.GRPC_DEV_IP
) as string

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
  ConfigServiceRoutes,
  LanguageServiceRoutes,
  PageServiceRoutes
} = (grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType)
  .ServiceRoutes
