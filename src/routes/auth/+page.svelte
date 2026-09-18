<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import AuthTabs from '$lib/features/auth/auth-tabs.svelte';
</script>

<div class="flex min-h-screen items-center justify-center bg-background px-4 py-8">
	<Card class="w-full max-w-sm">
		<CardHeader class="text-center">
			<CardTitle class="text-2xl">Welcome</CardTitle>
			<CardDescription>Sign in to your account or create a new one</CardDescription>
		</CardHeader>
		<CardContent>
			<AuthTabs />
		</CardContent>
	</Card>
</div>
