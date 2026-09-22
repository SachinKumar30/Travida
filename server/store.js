import { supabase } from './lib/supabase.js';

const VALID_SECTIONS = [
  'hero',
  'problem',
  'services',
  'process',
  'stakeholders',
  'whyChoose',
  'contact',
  'meta',
];

export async function getContent() {
  const { data, error } = await supabase.from('site_content').select('section, data');
  if (error) throw new Error(`Failed to load content: ${error.message}`);

  const content = {};
  for (const row of data) {
    content[row.section] = row.data;
  }
  return content;
}

export async function updateContentSection(section, data) {
  if (!VALID_SECTIONS.includes(section)) {
    throw new Error(`Unknown content section: ${section}`);
  }
  const { error } = await supabase
    .from('site_content')
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' });
  if (error) throw new Error(`Failed to save ${section}: ${error.message}`);
  return data;
}

function submissionFromRow(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    read: row.read,
    name: row.name,
    email: row.email,
    company: row.company || '',
    phone: row.phone || '',
    inquiryType: row.inquiry_type,
    message: row.message,
  };
}

export async function getSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to load submissions: ${error.message}`);
  return data.map(submissionFromRow);
}

export async function addSubmission(submission) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: submission.name,
      email: submission.email,
      company: submission.company || '',
      phone: submission.phone || '',
      inquiry_type: submission.inquiryType,
      message: submission.message,
    })
    .select()
    .single();
  if (error) throw new Error(`Failed to save submission: ${error.message}`);
  return submissionFromRow(data);
}

export async function markSubmissionRead(id, read = true) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ read })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw new Error(`Failed to update submission: ${error.message}`);
  return data ? submissionFromRow(data) : null;
}

export async function deleteSubmission(id) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw new Error(`Failed to delete submission: ${error.message}`);
  return data.length > 0;
}

export async function getAdminByUsername(username) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, password_hash')
    .eq('username', username)
    .maybeSingle();
  if (error) throw new Error(`Failed to load admin: ${error.message}`);
  return data;
}

export async function updateAdminPassword(username, passwordHash) {
  const { error } = await supabase
    .from('admin_users')
    .update({ password_hash: passwordHash })
    .eq('username', username);
  if (error) throw new Error(`Failed to update password: ${error.message}`);
}
