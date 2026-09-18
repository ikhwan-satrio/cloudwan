<script lang="ts">
	import HouseIcon from '@lucide/svelte/icons/house';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import UserIcon from '@lucide/svelte/icons/user';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/lib/supabase-client';
	import SidebarContent from '$lib/components/ui/sidebar/sidebar-content.svelte';
	import SidebarFooter from '$lib/components/ui/sidebar/sidebar-footer.svelte';
	import SidebarGroup from '$lib/components/ui/sidebar/sidebar-group.svelte';
	import SidebarGroupContent from '$lib/components/ui/sidebar/sidebar-group-content.svelte';
	import SidebarGroupLabel from '$lib/components/ui/sidebar/sidebar-group-label.svelte';
	import SidebarHeader from '$lib/components/ui/sidebar/sidebar-header.svelte';
	import SidebarMenu from '$lib/components/ui/sidebar/sidebar-menu.svelte';
	import SidebarMenuButton from '$lib/components/ui/sidebar/sidebar-menu-button.svelte';
	import SidebarMenuItem from '$lib/components/ui/sidebar/sidebar-menu-item.svelte';
	import SidebarRail from '$lib/components/ui/sidebar/sidebar-rail.svelte';
	import SidebarRoot from '$lib/components/ui/sidebar/sidebar.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { queryUserOptions } from '$lib/features/auth/queries';
	import { goto } from '$app/navigation';

	const userQuery = createQuery(() => queryUserOptions(supabase));

	const logoutMutation = createMutation(() => ({
		mutationKey: [`logout-${userQuery.data?.user_metadata.name}`],
		mutationFn: async () => await supabase.auth.signOut(),
		onSuccess() {
			userQuery.refetch();
			goto('/auth');
		}
	}));

	const navItems = [
		{ title: 'Home', url: '/', icon: HouseIcon },
		{ title: 'Storage', url: '/storage', icon: InboxIcon }
	];
</script>

<SidebarRoot collapsible="icon">
	<SidebarHeader class="border-b border-sidebar-border p-2">
		<SidebarMenu>
			<SidebarMenuItem>
				{#if userQuery.isLoading}
					<div class="flex items-center gap-2 px-2 py-1.5">
						<Skeleton class="size-8 rounded-lg" />
						<Skeleton class="h-6 flex-1" />
					</div>
				{:else if userQuery.data}
					<SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent">
						<div
							class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
						>
							<UserIcon class="size-4" />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{userQuery.data.user_metadata.name}</span>
						</div>
						<button
							disabled={logoutMutation.isPending}
							onclick={() => logoutMutation.mutate()}
							class="ms-auto rounded-md p-1.5 text-sidebar-accent-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
						>
							<LogOutIcon class="size-4" />
						</button>
					</SidebarMenuButton>
				{:else}
					<SidebarMenuButton>
						{#snippet child({ props })}
							<a href="/auth" {...props}>
								<UserIcon />
								<span>Login / Register</span>
							</a>
						{/snippet}
					</SidebarMenuButton>
				{/if}
			</SidebarMenuItem>
		</SidebarMenu>
	</SidebarHeader>
	<SidebarContent>
		<SidebarGroup>
			<SidebarGroupLabel>Application</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{#each navItems as item (item.title)}
						<SidebarMenuItem>
							<SidebarMenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</SidebarMenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	</SidebarContent>
	<SidebarFooter class="border-t border-sidebar-border p-2"></SidebarFooter>
	<SidebarRail />
</SidebarRoot>
