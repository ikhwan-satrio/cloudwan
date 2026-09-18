import type { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions } from '@tanstack/svelte-query';

export const queryUserOptions = (supabase: SupabaseClient) =>
	queryOptions({
		queryKey: ['user'],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			return data.user;
		}
	});
