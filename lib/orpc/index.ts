import { router } from "@/lib/orpc/router"
import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { RouterClient } from "@orpc/server"

const rpcLink = new RPCLink({
    url: "http://localhost:3000/rpc"
})

export const api: RouterClient<typeof router> = createORPCClient(rpcLink)