<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import LoginForm from '$lib/features/auth/login-form.svelte';
	import RegisterForm from '$lib/features/auth/register-form.svelte';
</script>

<Tabs value="login" class="w-full">
	<TabsList class="grid w-full grid-cols-2">
		<TabsTrigger value="login">Sign In</TabsTrigger>
		<TabsTrigger value="register">Sign Up</TabsTrigger>
	</TabsList>
	<TabsContent value="login" class="mt-4">
		<LoginForm />
	</TabsContent>
	<TabsContent value="register" class="mt-4">
		<RegisterForm />
	</TabsContent>
</Tabs>
