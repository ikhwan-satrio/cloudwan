<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import Shell from '$lib/components/layout/shell.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<Shell>
	{@render children?.()}
</Shell>
<Toaster />
