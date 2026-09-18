<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { supabase } from '$lib/lib/supabase-client';
	import { toast } from 'svelte-sonner';

	const form = createForm(() => ({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		},
		onSubmit: async ({ value }) => {
			const { error } = await supabase.auth.signUp({
				email: value.email,
				password: value.password,
				options: {
					data: { name: value.name }
				}
			});

			if (error) {
				toast.error(error.message);
				return;
			}

			toast.success('Check your email for a confirmation link.');
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
		name="name"
		validators={{
			onBlur: ({ value }) => (!value ? 'Name is required' : undefined)
		}}
	>
		{#snippet children(field)}
			<div class="grid gap-2">
				<Label for={field.name}>Name</Label>
				<Input
					id={field.name}
					type="text"
					placeholder="John Doe"
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
			onBlur: ({ value }) =>
				!value ? 'Password is required' : value.length < 6 ? 'At least 6 characters' : undefined
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
				{isSubmitting ? 'Creating account...' : 'Create Account'}
			</Button>
		{/snippet}
	</form.Subscribe>
</form>
