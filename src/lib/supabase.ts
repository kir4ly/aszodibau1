import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Warn if Supabase is not configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Create a dummy client if not configured to prevent crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  created_at: string;
}

export interface ContentItem {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'html';
  section: string | null;
  created_at: string;
  updated_at: string;
}

export const verifyAccessCode = async (code: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admin_access')
      .select('code')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error verifying access code:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error verifying access code:', error);
    return false;
  }
};

export const uploadImage = async (
  file: File,
  title?: string,
  description?: string
): Promise<void> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `gallery/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  const { error: dbError } = await supabase
    .from('gallery_images')
    .insert({
      image_url: publicUrl,
      title: title || null,
      description: description || null,
    });

  if (dbError) {
    await supabase.storage.from('images').remove([filePath]);
    throw dbError;
  }
};

export const getImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const deleteImage = async (id: string, imageUrl: string): Promise<void> => {
  const filePath = imageUrl.split('/').slice(-2).join('/');

  const { error: storageError } = await supabase.storage
    .from('images')
    .remove([filePath]);

  if (storageError) {
    console.error('Error deleting from storage:', storageError);
  }

  const { error: dbError } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id);

  if (dbError) {
    throw dbError;
  }
};

export const getContent = async (): Promise<ContentItem[]> => {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('section', { ascending: true })
    .order('key', { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};

export const saveContent = async (content: {
  id: string | null;
  key: string;
  value: string;
  type: 'text' | 'html';
  section: string | null;
}): Promise<void> => {
  if (content.id) {
    const { error } = await supabase
      .from('site_content')
      .update({
        key: content.key,
        value: content.value,
        type: content.type,
        section: content.section,
        updated_at: new Date().toISOString(),
      })
      .eq('id', content.id);

    if (error) {
      throw error;
    }
  } else {
    const { error } = await supabase
      .from('site_content')
      .insert({
        key: content.key,
        value: content.value,
        type: content.type,
        section: content.section,
      });

    if (error) {
      throw error;
    }
  }
};

export const deleteContent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('site_content')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const getContentByKey = async (key: string): Promise<ContentItem | null> => {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    console.error('Error getting content by key:', error);
    return null;
  }

  return data;
};

export const getContentBySection = async (section: string): Promise<ContentItem[]> => {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('section', section)
    .order('key', { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};
