import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogCard } from '../components/BlogCard';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Latest Posts</h2>
      
      {posts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">No posts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => navigate(`/post/${post.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}