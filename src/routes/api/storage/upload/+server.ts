import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { user, supabaseAdmin } }) => {
	if (!user) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const formData = await request.formData();
	const file = formData.get('file') as File | null;

	if (!file || file.size === 0) {
		return json({ error: 'No file selected' }, { status: 400 });
	}

	const filePath = user.id + '/' + file.name;
	const { error } = await supabaseAdmin.storage.from('cloudwan').upload(filePath, file, {
		upsert: true
	});

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json({ success: true });
};
