<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	import {
		Upload,
		Lock,
		Download,
		Eye,
		FolderOpen,
		RefreshCw,
		ArrowRight,
		Cloud
	} from '@lucide/svelte';

	const features = [
		{
			icon: Upload,
			title: 'Easy Upload',
			description: 'Drag and drop or click to upload. Support for all file types up to 50MB.'
		},
		{
			icon: Lock,
			title: 'Secure Storage',
			description: 'Enterprise-grade security with row-level security policies per user.'
		},
		{
			icon: Download,
			title: 'Instant Download',
			description: 'Download your files anytime with fast, signed URLs that expire automatically.'
		},
		{
			icon: Eye,
			title: 'Image Preview',
			description: 'Preview images directly in your browser with a built-in viewer.'
		},
		{
			icon: FolderOpen,
			title: 'File Management',
			description: 'Organize and delete files with an intuitive, responsive interface.'
		},
		{
			icon: RefreshCw,
			title: 'Real-time Sync',
			description: 'Files sync instantly across all your devices with Supabase Realtime.'
		}
	];

	const stats = [
		{ value: '99.9%', label: 'Uptime' },
		{ value: '50MB', label: 'Max File Size' },
		{ value: 'Free', label: 'To Start' }
	];
</script>

<svelte:head>
	<title>CloudWan - Cloud Storage Made Simple</title>
	<meta
		name="description"
		content="Secure, fast, and reliable cloud storage for your files. Upload, manage, and share with ease."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- Hero -->
	<section
		class="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20 sm:py-32"
	>
		<div
			class="bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.708 0 0/15%),transparent)] pointer-events-none absolute inset-0"
		></div>
		<div class="relative mx-auto max-w-3xl text-center">
			<div
				class="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
			>
				<span class="size-1.5 rounded-full bg-green-500"></span>
				Now in early access
			</div>
			<h1 class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
				Cloud storage
				<br />
				<span
					class="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent"
					>made simple</span
				>
			</h1>
			<p class="mb-10 text-lg text-muted-foreground sm:text-xl">
				Upload, manage, and share your files with ease. Fast, secure, and reliable storage powered
				by Supabase.
			</p>
			<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
				<Button.Root size="lg" href="/auth" class="w-full sm:w-auto">
					Get Started Free
					<ArrowRight class="ml-1.5 size-4" />
				</Button.Root>
				<Button.Root variant="outline" size="lg" href="/auth" class="w-full sm:w-auto">
					Sign In
				</Button.Root>
			</div>
		</div>
	</section>

	<!-- Stats -->
	<section class="border-y bg-muted/30 px-4 py-12">
		<div class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 sm:flex-row">
			{#each stats as stat, i}
				<div class="flex flex-col items-center gap-1 text-center">
					<span class="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</span>
					<span class="text-sm text-muted-foreground">{stat.label}</span>
				</div>
				{#if i < stats.length - 1}
					<div class="hidden h-12 w-px bg-border sm:block"></div>
				{/if}
			{/each}
		</div>
	</section>

	<!-- Features -->
	<section class="px-4 py-16 sm:py-24">
		<div class="mx-auto max-w-6xl">
			<div class="mb-14 text-center">
				<h2 class="mb-3 text-2xl font-bold sm:text-3xl">Everything you need</h2>
				<p class="text-muted-foreground">Simple, powerful tools for your files</p>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<div class="group rounded-xl border bg-card p-6 transition-colors hover:bg-accent/50">
						<div
							class="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
						>
							<feature.icon class="size-5" />
						</div>
						<h3 class="mb-2 font-semibold">{feature.title}</h3>
						<p class="text-sm leading-relaxed text-muted-foreground">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="border-y bg-muted/30 px-4 py-16 sm:py-20">
		<div class="mx-auto max-w-2xl text-center">
			<div
				class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
			>
				<Cloud class="size-7" />
			</div>
			<h2 class="mb-4 text-2xl font-bold sm:text-3xl">Ready to get started?</h2>
			<p class="mb-8 text-muted-foreground">
				Create your free account and start uploading files in seconds.
			</p>
			<Button.Root size="lg" href="/auth">
				Create Free Account
				<ArrowRight class="ml-1.5 size-4" />
			</Button.Root>
		</div>
	</section>

	<!-- Footer -->
	<footer class="px-4 py-8">
		<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="flex items-center gap-2 text-sm text-muted-foreground">
				<Cloud class="size-4" />
				<span>&copy; {new Date().getFullYear()} CloudWan. All rights reserved.</span>
			</div>
			<div class="flex gap-4 text-sm text-muted-foreground">
				<a href="/auth" class="transition-colors hover:text-foreground">Sign In</a>
				<a href="/auth" class="transition-colors hover:text-foreground">Sign Up</a>
			</div>
		</div>
	</footer>
</div>
