<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { supabase } from '$lib/lib/supabase-client';
	import { toast } from 'svelte-sonner';

	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: ''
		},
		onSubmit: async ({ value }) => {
			const { error } = await supabase.auth.signInWithPassword({
				email: value.email,
				password: value.password
			});

			if (error) {
				toast.error(error.message);
				return;
			}

			window.location.href = '/api/auth/callback';
		}
	}));
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}}
	class="grid gap-4"
>
	<form.Field
		name="email"
		validators={{
			onBlur: ({ value }) => (!value ? 'Email is required' : undefined)
		}}
	>
		{#snippet children(field)}
			<div class="grid gap-2">
				<Label for={field.name}>Email</Label>
				<Input
					id={field.name}
					type="email"
					placeholder="name@example.com"
					value={field.state.value}
					onblur={field.handleBlur}
					oninput={(e: Event) => field.handleChange((e.target as HTMLInputElement).value)}
				/>
				{#if field.state.meta.errors.length}
					<p class="text-sm text-destructive">{field.state.meta.errors[0]}</p>
				{/if}
			</div>
		{/snippet}
	</form.Field>

	<form.Field
		name="password"
		validators={{
			onBlur: ({ value }) => (!value ? 'Password is required' : undefined)
		}}
	>
		{#snippet children(field)}
			<div class="grid gap-2">
				<Label for={field.name}>Password</Label>
				<Input
					id={field.name}
					type="password"
					placeholder="••••••••"
					value={field.state.value}
					onblur={field.handleBlur}
					oninput={(e: Event) => field.handleChange((e.target as HTMLInputElement).value)}
				/>
				{#if field.state.meta.errors.length}
					<p class="text-sm text-destructive">{field.state.meta.errors[0]}</p>
				{/if}
			</div>
		{/snippet}
	</form.Field>

	<form.Subscribe
		selector={(state) => ({
			canSubmit: state.canSubmit,
			isSubmitting: state.isSubmitting
		})}
	>
		{#snippet children({ canSubmit, isSubmitting })}
			<Button type="submit" disabled={!canSubmit}>
				{isSubmitting ? 'Signing in...' : 'Sign In'}
			</Button>
		{/snippet}
	</form.Subscribe>
</form>
