import { createClient } from "@supabase/supabase-js";
import { slugify } from "@util/helpers";

const supabaseUrl = "https://pfourseopabbkzxtwolb.supabase.co";
const supabaseKey = import.meta.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getProducts = async () => {
  const promises = [
    "CPUProducts",
    "GPUProducts",
    "MOBOProducts",
    "RAMProducts",
    "SSDProducts",
  ].map((item) => supabase.from(item).select("*"));

  const results = (await Promise.allSettled(promises)).flatMap((item) => {
    if (item.status === "fulfilled" && item.value.data?.length) {
      return item.value.data.map((product) => {
        const {
          ProductCode,
          ProductTitle,
          FeaturedImage,
          SortPrice,
          ProductCategory,
          PriceInclVAT,
        }: any = product;

        return {
          id: ProductCode,
          slug: slugify(ProductTitle),
          body: "",
          collection: "product",
          data: {
            // title: ProductTitle,
            title: ProductTitle,
            id: ProductCode,
            intro: "",
            // intros: [SocketType, CPUCores],
            thumbnail: FeaturedImage,
            price: SortPrice,
            priceDisplay: PriceInclVAT,
            offer_price: 0,
            taxable: true,
            tax_included: false,
            in_stock: true,
            is_digital: false,
            shipping: { weight: 649 },
            category: ["All", ProductCategory],
            date: "2023-08-28T20:42:48.308Z",
            style: { container: "md" },
          },
        };
      });
    }

    return [];
  });

  //   console.log(results);

  return results || [];
};

export default supabase;
