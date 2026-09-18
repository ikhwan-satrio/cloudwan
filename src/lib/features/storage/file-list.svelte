<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	import { createMutation } from '@tanstack/svelte-query';
	import { useQueryClient } from '@tanstack/svelte-query';
	import ImagePreviewSheet from '$lib/features/storage/image-preview-sheet.svelte';

	interface FileItem {
		name: string;
		signedUrl: string;
		created_at: string | null;
		updated_at: string | null;
		metadata?: {
			size?: number;
			mimetype?: string;
		};
	}

	interface Props {
		files: FileItem[];
	}

	let { files }: Props = $props();
	const queryClient = useQueryClient();

	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];

	function isImage(fileName: string): boolean {
		const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
		return imageExtensions.includes(ext);
	}

	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	let sheetOpen = $state(false);
	let selectedFile = $state<FileItem | null>(null);

	function openSheet(file: FileItem) {
		if (!isImage(file.name)) return;
		selectedFile = file;
		sheetOpen = true;
	}

	const deleteMutation = createMutation(() => ({
		mutationFn: async (fileName: string) => {
			const res = await fetch('/api/storage/delete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fileName })
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.error || 'Delete failed');
			}

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['files'] });
		}
	}));
</script>

{#if files.length === 0}
	<div class="flex flex-col items-center justify-center py-12 text-muted-foreground">
		<svg
			class="mb-3 size-12 opacity-50"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
			/>
		</svg>
		<p>No files uploaded yet</p>
	</div>
{:else}
	<div class="flex flex-col gap-2">
		{#each files as file (file.name)}
			<button
				class="flex items-center justify-between rounded-lg border bg-card p-2.5 transition-colors hover:bg-accent/50 sm:p-3"
				class:cursor-pointer={isImage(file.name)}
				role={isImage(file.name) ? 'button' : undefined}
				tabindex={isImage(file.name) ? 0 : undefined}
				onclick={isImage(file.name) ? () => openSheet(file) : undefined}
				onkeydown={isImage(file.name)
					? (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								openSheet(file);
							}
						}
					: undefined}
			>
				<div class="flex items-center gap-2.5 overflow-hidden sm:gap-3">
					{#if isImage(file.name) && file.signedUrl}
						<img
							src={file.signedUrl}
							alt={file.name}
							class="size-8 shrink-0 rounded object-cover sm:size-8"
						/>
					{:else}
						<svg
							class="size-8 shrink-0 text-muted-foreground"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
					{/if}
					<div class="min-w-0">
						<p class="truncate text-sm font-medium">{file.name}</p>
						<p class="text-xs text-muted-foreground">
							{formatFileSize(Number(file.metadata?.size ?? 0))} &middot;
							{formatDate(file.created_at ?? '')}
						</p>
					</div>
				</div>
				<div class="flex shrink-0 items-center gap-1">
					{#if file.signedUrl}
						<Button.Root variant="ghost" size="icon-sm" href={file.signedUrl} download>
							<svg
								class="size-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
						</Button.Root>
					{/if}
					<Button.Root
						variant="destructive"
						size="icon-sm"
						disabled={deleteMutation.isPending}
						onclick={() => deleteMutation.mutate(file.name)}
					>
						{#if deleteMutation.isPending && deleteMutation.variables === file.name}
							<svg
								class="size-4 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{:else}
							<svg
								class="size-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						{/if}
					</Button.Root>
				</div>
			</button>
		{/each}
	</div>
{/if}

{#if selectedFile}
	<ImagePreviewSheet
		file={selectedFile}
		bind:open={sheetOpen}
		onclose={() => (selectedFile = null)}
	/>
{/if}
