import { createClient } from "./supabase/client";

const supabase = createClient();
const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
}

