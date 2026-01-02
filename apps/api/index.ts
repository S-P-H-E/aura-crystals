import "dotenv/config"
import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { getProducts, ProductsResponseSchema } from './lib/products'

// Only use node adapter in development (not compatible with Vercel serverless)
const app = new Elysia(
	process.env.NODE_ENV !== 'production' ? { adapter: node() } : undefined
)
	.get('/', () => 'Hello Elysia')
  .get('/products', async () => {
    return await getProducts()
  }, {
    response: ProductsResponseSchema
  })

export default app
export type App = typeof app

// Only listen in development (for local testing)
if (process.env.NODE_ENV !== 'production') {
	app.listen(8080, ({ hostname, port }) => {
		console.log(`🦊 Elysia is running at ${hostname}:${port}`)
	})
}