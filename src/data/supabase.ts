import { createClient } from "@supabase/supabase-js";
import { slugify } from "@util/helpers";
const supabaseUrl = "https://pfourseopabbkzxtwolb.supabase.co";
// console.log(import.meta.env);
const supabaseKey =
  import.meta.env.SUPABASE_KEY || import.meta.env.PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
const productCategories = [
  "CPUProducts",
  "GPUProducts",
  "MOBOProducts",
  "RAMProducts",
  "SSDProducts",
];
const productCategoriesSlug = {
  cpus: productCategories[0],
  gpus: productCategories[1],
  mobos: productCategories[2],
  ram: productCategories[3],
  ssds: productCategories[4],
};
export const getProductsByFilters = async (
  price: number[],
  filters: string,
  slug: string,
) => {
  const call = async (params: string) => {
    const minPrice = price[0];
    const maxPrice = price[1];
    const rep = supabase.from(params).select("*")
    if (filters) {
      rep.or(filters)
    }
    if (minPrice && maxPrice) {
      rep.gte('SortPrice', minPrice)
      rep.lte('SortPrice', maxPrice)
    }
    const { data } = await rep
    if (data) {
      return data
    }
    return null;
  }
  if (slug === 'all') {
    async function fetchData() {
      let arrayTemp: any[] = [];
      const promises = productCategories.map(async (item) => {
        const temp = await call(item);
        if (temp) {
          arrayTemp = [...arrayTemp, ...temp];
        }
      });
    
      await Promise.all(promises);
      return arrayTemp;
    }

    return await fetchData();
  }
  if (productCategoriesSlug[slug]) {
    const data = await call(productCategoriesSlug[slug])
    return data
  }

  return null;
}

export const getProducts = async (filters?: any) => {
  let promises: any[] = [];
  if (filters) {
    promises = ["CPUProducts"].map((item) => {
      return supabase
        .from(item)
        .select("*")
        .in("Brand", ["Intel", "AMD"])
        .range(0, 8);
    });
  } else {
    promises = productCategories.map((item) => supabase.from(item).select("*"));
  }
  const results = (await Promise.allSettled(promises)).flatMap((item) => {
    if (item.status === "fulfilled" && item.value.data?.length) {
      return item.value.data.map((product: any) => {
        const {
          ProductCode,
          ProductTitle,
          FeaturedImage,
          SortPrice,
          ProductCategory,
          PriceInclVAT,
          ...rest
        }: any = product;
        return {
          id: ProductCode,
          slug: slugify(ProductTitle),
          body: "",
          collection: "product",
          data: {
            title: ProductTitle,
            id: ProductCode,
            intro: "",
            thumbnail: FeaturedImage,
            price: SortPrice,
            priceDisplay: PriceInclVAT,
            offer_price: 0,
            taxable: true,
            tax_included: false,
            in_stock: true,
            is_digital: false,
            category: ["All", ProductCategory],
            style: { container: "md" },
            ...rest,
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
