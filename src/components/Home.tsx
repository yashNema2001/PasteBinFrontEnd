import { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

export default function Home() {
  const [content, setContent] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const submit = async () => {
    if (!content.trim()) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload: Record<string, any> = {
        content,
        ttl_seconds: 3600
      };

      if (maxViews.trim()) {
        payload.max_views = parseInt(maxViews, 10);
      }

      const res = await fetch('https://pastebinbackend-production.up.railway.app/api/pastes', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (res.ok) {
        setUrl(data.url);
        setContent('');
        setMaxViews('');
      } else {
        setError(data.error || 'Failed to create paste');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure it is running on localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pastebin</h1>
          <p className="text-gray-600 mb-8">Share text snippets instantly</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paste Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your paste content here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Views (optional)</label>
                <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  placeholder="e.g., 5"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TTL</label>
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                  1 hour
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Creating...' : 'Create Paste'}
            </button>

            {url && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-800 mb-3">Paste created successfully!</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 break-all"
                  >
                    {url}
                    <ExternalLink size={16} className="flex-shrink-0" />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
