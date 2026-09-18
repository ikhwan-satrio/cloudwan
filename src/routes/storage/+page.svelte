<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import UploadForm from '$lib/features/storage/upload-form.svelte';
	import FileList from '$lib/features/storage/file-list.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryFilesOptions } from '$lib/features/storage/queries';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const filesQuery = createQuery(() => queryFilesOptions(data.files));
</script>

<main class="min-h-screen w-full p-4 sm:p-5">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Your Storage</Card.Title>
			<Card.Description>Manage your files stored in Supabase</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<UploadForm />
			<div class="h-px bg-border"></div>
			<FileList files={filesQuery.data} />
		</Card.Content>
	</Card.Root>
</main>
