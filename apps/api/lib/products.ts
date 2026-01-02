import { t } from 'elysia'
import { shopifyFetch } from './shopifyFetch.js'

export const ProductSchema = t.Object({
  id: t.String(),
  title: t.String(),
  description: t.String(),
  price: t.String(),
  assets: t.Array(t.Object({
    id: t.Optional(t.String()),
    url: t.String(),
    altText: t.Union([t.String(), t.Null()])
  }))
})

export const ProductsResponseSchema = t.Array(ProductSchema)

const PRODUCTS_QUERY = `{
  products(first: 10) {
    edges {
      node {
        id
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
      }
    }
  }
}`

export async function getProducts() {
  const res = await shopifyFetch({
    query: PRODUCTS_QUERY
  })
  
  // Transform the nested structure: res.body.data.products.edges -> flat array of products
  const edges = res.body?.data?.products?.edges || []
  const products = edges.map((edge: any) => {
    const node = edge.node
    return {
      id: node.id,
      title: node.title,
      description: node.description || '',
      price: `${node.priceRange?.minVariantPrice?.amount} ${node.priceRange?.minVariantPrice?.currencyCode}`,
      assets: node.images?.edges?.map((imgEdge: any) => ({
        id: imgEdge.node.id,
        url: imgEdge.node.url,
        altText: imgEdge.node.altText
      })) || []
    }
  })
  
  return products
}

