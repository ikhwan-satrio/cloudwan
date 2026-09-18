<script lang="ts">
	import SidebarProvider from '$lib/components/ui/sidebar/sidebar-provider.svelte';
	import SidebarInset from '$lib/components/ui/sidebar/sidebar-inset.svelte';
	import SidebarTrigger from '$lib/components/ui/sidebar/sidebar-trigger.svelte';
	import SidebarSeparator from '$lib/components/ui/sidebar/sidebar-separator.svelte';
	import AppSidebar from '$lib/components/layout/app-sidebar.svelte';
	import * as Button from '$lib/components/ui/button';
	import { Moon, Sun } from '@lucide/svelte';
	import { mode, toggleMode } from 'mode-watcher';

	let { children } = $props();
</script>

<SidebarProvider>
	<AppSidebar />
	<SidebarInset>
		<header
			class="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 supports-[backdrop-filter]:bg-background/60"
		>
			<div class="flex w-full items-center justify-between gap-2 px-4">
				<div class="flex items-center gap-2">
					<SidebarTrigger class="-ms-1" />
					<SidebarSeparator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				</div>
				<Button.Root variant="ghost" size="icon-sm" onclick={toggleMode}>
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button.Root>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 pt-0">
			{@render children()}
		</div>
	</SidebarInset>
</SidebarProvider>
