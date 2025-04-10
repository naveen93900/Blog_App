import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 line-clamp-2">{post.title}</h3>
        <p className="text-gray-700 line-clamp-3">{post.content}</p>
      </div>
    </div>
  );
}