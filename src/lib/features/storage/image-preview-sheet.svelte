<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';

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
		file: FileItem;
		open: boolean;
		onclose: () => void;
	}

	let { file, open = $bindable(), onclose }: Props = $props();

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
</script>

<Sheet.Root bind:open>
	<Sheet.Content class="gap-0 sm:max-w-lg">
		<Sheet.Header class="px-4 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
			<Sheet.Title class="truncate text-base">{file.name}</Sheet.Title>
		</Sheet.Header>
		<div class="flex max-h-[calc(100vh-10rem)] flex-col gap-0 overflow-y-auto px-4 sm:px-6">
			{#if file.signedUrl && isImage(file.name)}
				<div class="mb-4 overflow-hidden rounded-lg border bg-muted">
					<img
						src={file.signedUrl}
						alt={file.name}
						class="max-h-64 w-full object-contain sm:max-h-80"
					/>
				</div>
			{/if}
			<div class="flex flex-col pb-6 text-sm">
				<div class="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-muted-foreground">Name</span>
					<span class="truncate text-right font-medium sm:max-w-62.5">{file.name}</span>
				</div>
				<div class="h-px bg-border"></div>
				<div class="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-muted-foreground">Size</span>
					<span class="font-medium">{formatFileSize(Number(file.metadata?.size ?? 0))}</span>
				</div>
				<div class="h-px bg-border"></div>
				<div class="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-muted-foreground">Type</span>
					<span class="font-medium">{file.metadata?.mimetype ?? 'Unknown'}</span>
				</div>
				<div class="h-px bg-border"></div>
				<div class="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-muted-foreground">Created</span>
					<span class="font-medium">{formatDate(file.created_at ?? '')}</span>
				</div>
				<div class="h-px bg-border"></div>
				<div class="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
					<span class="text-muted-foreground">Updated</span>
					<span class="font-medium">{formatDate(file.updated_at ?? '')}</span>
				</div>
			</div>
		</div>
		<Sheet.Footer
			class="flex-col gap-2 border-t px-4 pt-3 pb-5 sm:flex-row sm:justify-end sm:px-6 sm:pt-4 sm:pb-6"
		>
			{#if file.signedUrl}
				<Button.Root variant="outline" href={file.signedUrl} download class="w-full sm:w-auto">
					<svg
						class="mr-1.5 size-4"
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
					Download
				</Button.Root>
			{/if}
			<Sheet.Close>
				{#snippet child({ props })}
					<Button.Root {...props} variant="outline" class="w-full sm:w-auto">Close</Button.Root>
				{/snippet}
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
