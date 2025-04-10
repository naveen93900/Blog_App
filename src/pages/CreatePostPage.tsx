import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      setError('User email not found. Please try logging in again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            user_id: user.id,
            author_email: user.email
          },
        ]);

      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      console.error('Error creating post:', error);
      setError(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Write your post content here..."
                required
              />
            </div>
            
            {error && <div className="text-red-600 text-sm">{error}</div>}
            
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}