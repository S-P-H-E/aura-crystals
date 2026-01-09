import { os } from "@orpc/server";
import { z } from "zod";
import { getProducts } from "../products";

const products = os
    .input(
        z.optional(z.object({
            first: z.number()
        }))
    )
    .handler(async({ input }) => {
        const data = await getProducts()
        return data;
    });

export const router = {
    products
}
