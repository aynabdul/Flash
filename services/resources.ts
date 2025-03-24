import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getResources() {
    const { data, error } = await supabase
        .from('resources')
        .select('name, pdf_url');

    if (error) {
        throw new Error(`Error fetching resources: ${error.message}`);
    }

    return data;
}
