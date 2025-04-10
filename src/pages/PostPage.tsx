import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BlogPost } from '../types';

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!post || !user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)
        .eq('user_id', user.id);

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error || !post) {
    return <div className="text-center text-red-600">{error || 'Post not found'}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft size={18} /> Back to all posts
        </button>
        
        <h2 className="text-3xl font-bold mb-6">{post.title}</h2>
        
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {user && post.user_id === user.id && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}