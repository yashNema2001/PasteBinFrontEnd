// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Eye, Calendar } from 'lucide-react';

// interface PasteData {
//   content: string;
//   remaining_views: number | null;
//   expires_at: string | null;
// }

// export default function ViewPaste() {
//   const { id } = useParams<{ id: string }>();
//   const [paste, setPaste] = useState<PasteData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPaste = async () => {
//       try {
//         const res = await fetch(`https://pastebinbackend-production.up.railway.app/api/pastes/${id}`, {
//           cache: 'no-store'
//         });

//         if (!res.ok) {
//           setError('Paste not found or expired');
//           return;
//         }

//         const data = await res.json();
//         setPaste(data);
//       } catch (err) {
//         setError('Failed to connect to server');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaste();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading paste...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !paste) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">404 - Paste Not Found or Expired</h1>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
//           >
//             <ArrowLeft size={16} />
//             Create New Paste
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
//         >
//           <ArrowLeft size={16} />
//           Back to Home
//         </Link>

//         <div className="bg-white rounded-lg shadow-xl p-8">
//           <div className="flex flex-col gap-4 mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Paste Content</h2>
//             <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//               {paste.remaining_views !== null && (
//                 <div className="flex items-center gap-2">
//                   <Eye size={16} />
//                   <span>Views remaining: {paste.remaining_views}</span>
//                 </div>
//               )}
//               {paste.expires_at && (
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} />
//                   <span>Expires: {new Date(paste.expires_at).toLocaleString()}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <pre className="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-gray-800">
//             {paste.content}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar } from 'lucide-react';

interface PasteData {
  content: string;
  remaining_views: number | null;
  expires_at: string | null;
}

export default function ViewPaste() {
  const { id } = useParams<{ id: string }>();
  const [paste, setPaste] = useState<PasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(
          `https://pastebinbackend-production.up.railway.app/api/pastes/${id}`,
          { cache: 'no-store' }
        );

        if (!res.ok) {
          setError('Paste not found or expired');
          return;
        }

        const data = await res.json();
        setPaste(data);
      } catch {
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error || !paste) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-red-600 text-2xl">404 - Paste Not Found</h1>
        <Link to="/" className="text-blue-600 underline">
          Create New Paste
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/" className="text-blue-600 underline flex items-center mb-4">
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-6 text-gray-600 mb-4">
          {paste.remaining_views !== null && (
            <span className="flex items-center gap-1">
              <Eye size={16} /> {paste.remaining_views}
            </span>
          )}
          {paste.expires_at && (
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(paste.expires_at).toLocaleString()}
            </span>
          )}
        </div>

        <pre className="bg-gray-100 p-4 rounded font-mono whitespace-pre-wrap">
          {paste.content}
        </pre>
      </div>
    </div>
  );
}
