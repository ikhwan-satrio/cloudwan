<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	import * as Input from '$lib/components/ui/input';
	import * as Label from '$lib/components/ui/label';
	import { createForm } from '@tanstack/svelte-form';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';

	interface Props {
		onUploadComplete?: () => void;
	}

	let { onUploadComplete }: Props = $props();
	const queryClient = useQueryClient();

	let fileInput = $state<HTMLInputElement | null>(null);

	const uploadForm = createForm(() => ({
		defaultValues: {
			file: null as File | null
		},
		onSubmit: async ({ value }) => {
			if (!value.file) return;

			const formData = new FormData();
			formData.append('file', value.file);

			const res = await fetch('/api/storage/upload', {
				method: 'POST',
				body: formData
			});

			const result = await res.json();

			if (!res.ok) {
				toast.error(result.error || 'Upload failed');
				return;
			}

			toast.success('File uploaded successfully');
			uploadForm.reset();
			if (fileInput) fileInput.value = '';
			queryClient.invalidateQueries({ queryKey: ['files'] });
			onUploadComplete?.();
		}
	}));
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		uploadForm.handleSubmit();
	}}
	class="flex flex-col gap-3 sm:flex-row sm:items-end"
>
	<div class="flex-1">
		<Label.Root for="file" class="text-sm font-medium">Upload File</Label.Root>
		<Input.Root
			bind:ref={fileInput}
			type="file"
			id="file"
			class="mt-1"
			disabled={uploadForm.state.isSubmitting}
			onchange={(e: Event) => {
				const input = e.target as HTMLInputElement;
				const file = input.files?.[0] ?? null;
				uploadForm.setFieldValue('file', file);
			}}
		/>
	</div>
	<uploadForm.Subscribe
		selector={(state) => ({
			canSubmit: state.canSubmit,
			isSubmitting: state.isSubmitting
		})}
	>
		{#snippet children({ isSubmitting })}
			<Button.Root type="submit" disabled={isSubmitting} class="w-full sm:w-auto">
				{isSubmitting ? 'Uploading...' : 'Upload'}
			</Button.Root>
		{/snippet}
	</uploadForm.Subscribe>
</form>
