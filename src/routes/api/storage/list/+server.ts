import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { user, supabaseAdmin } }) => {
	if (!user) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const folder = user.id + '/';
	const { data: files, error } = await supabaseAdmin.storage.from('cloudwan').list(folder, {
		sortBy: { column: 'created_at', order: 'desc' },
		limit: 100
	});

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	const filesWithUrl = await Promise.all(
		files.map(async (file) => {
			const { data } = await supabaseAdmin.storage
				.from('cloudwan')
				.createSignedUrl(folder + file.name, 3600);
			return {
				...file,
				signedUrl: data?.signedUrl ?? ''
			};
		})
	);

	return json({ files: filesWithUrl });
};
