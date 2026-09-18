import { queryOptions } from '@tanstack/svelte-query';

export const queryFilesOptions = (initialData: unknown[]) =>
	queryOptions({
		queryKey: ['files'],
		queryFn: async () => {
			const res = await fetch('/api/storage/list');
			const result = await res.json();
			return result.files || [];
		},
		initialData: initialData as never
	});
