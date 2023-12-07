import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pfourseopabbkzxtwolb.supabase.co";
const supabaseKey = import.meta.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
