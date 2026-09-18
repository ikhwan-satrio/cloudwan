import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { user, supabaseAdmin } }) => {
  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { fileName } = body;

  if (!fileName) {
    return json({ error: 'No file name provided' }, { status: 400 });
  }

  const filePath = user.email + '/' + fileName;
  const { error } = await supabaseAdmin.storage.from('cloudwan').remove([filePath]);

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({ success: true });
};
