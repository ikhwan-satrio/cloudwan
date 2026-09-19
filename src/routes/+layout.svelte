<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Providers from '$lib/components/layout/providers.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { ModeWatcher } from 'mode-watcher';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Cloudwan A cloud app that's so secure you'll forget" />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<Providers>
		{@render children()}
	</Providers>
	<SvelteQueryDevtools />
</QueryClientProvider>
<ModeWatcher />
