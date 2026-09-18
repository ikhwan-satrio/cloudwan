import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabaseAdmin } }) => {
	if (!user) {
		return { files: [], error: null };
	}

	const folder = user.id + '/';
	const { data: files, error } = await supabaseAdmin.storage.from('cloudwan').list(folder, {
		sortBy: { column: 'created_at', order: 'desc' },
		limit: 100
	});

	if (error) {
		return { files: [], error: error.message };
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

	return { files: filesWithUrl, error: null };
};
