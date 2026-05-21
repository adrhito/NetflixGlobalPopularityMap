export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">About This Project</h1>

      {/* Data Sources */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📊 Data Sources</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-blue-900 mb-2">
            <strong>Important:</strong> Netflix does not provide a public API for catalog data.
          </p>
          <p className="text-blue-800">
            This application uses <strong>TMDb (The Movie Database)</strong> API to access:
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-800 space-y-1">
            <li>Netflix availability by region</li>
            <li>IMDb ratings and vote counts</li>
            <li>Movie and TV show metadata</li>
          </ul>
        </div>
        <p className="text-gray-700">
          The app can also run with mock data for demonstration purposes when no API key is configured.
        </p>
      </section>

      {/* Popularity Formula */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🧮 Popularity Score Formula</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Regional Popularity Score (0-100)</h3>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm">
              Score = (Rating × 0.45) + (Log(Votes) × 0.40) + (Popularity Rank × 0.15)
            </div>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li><strong>Rating (45%):</strong> IMDb rating (0-10), normalized</li>
              <li><strong>Vote Count (40%):</strong> Logarithmic scale to handle wide ranges</li>
              <li><strong>Popularity Rank (15%):</strong> TMDb/IMDb trending indicator</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Global Score (0-100)</h3>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm">
              Global Score = (Popularity Score × 0.75) + (Region Coverage × 0.25)
            </div>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li><strong>Popularity Score (75%):</strong> Quality and engagement</li>
              <li><strong>Region Coverage (25%):</strong> Global reach indicator</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">⚙️ How It Works</h2>
        <ol className="space-y-3 text-gray-700">
          <li>
            <strong>1. Data Collection:</strong> The app fetches Netflix availability data for 15+ regions
            from TMDb API
          </li>
          <li>
            <strong>2. Metric Aggregation:</strong> For each title, we collect IMDb ratings, vote counts,
            and popularity signals
          </li>
          <li>
            <strong>3. Score Calculation:</strong> Titles are ranked using our weighted formula that balances
            quality (rating) with engagement (votes)
          </li>
          <li>
            <strong>4. Caching:</strong> Results are cached for 15 minutes to minimize API calls and improve
            performance
          </li>
          <li>
            <strong>5. Visualization:</strong> Data is displayed through interactive maps, sortable lists,
            and regional breakdowns
          </li>
        </ol>
      </section>

      {/* Setup Instructions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🚀 Setup Instructions</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Option 1: Use Mock Data (No API Key Required)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`# .env.local
USE_MOCK_DATA=true`}
            </pre>
            <p className="mt-2 text-gray-600 text-sm">Perfect for testing and demonstration</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Option 2: Use Real TMDb Data (Free API)</h3>
            <div className="space-y-2 text-gray-700">
              <p>1. Sign up at <a href="https://www.themoviedb.org/" className="text-[#e50914] hover:underline" target="_blank">https://www.themoviedb.org/</a></p>
              <p>2. Get API key from <a href="https://www.themoviedb.org/settings/api" className="text-[#e50914] hover:underline" target="_blank">API Settings</a></p>
              <p>3. Add to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>:</p>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto mt-2">
{`# .env.local
USE_MOCK_DATA=false
TMDB_API_KEY=your_api_key_here`}
            </pre>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">⚖️ Legal Considerations</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <ul className="space-y-2 text-yellow-900">
            <li>• Netflix is a registered trademark of Netflix, Inc.</li>
            <li>• This project is not affiliated with, endorsed by, or sponsored by Netflix, Inc.</li>
            <li>• Data is provided by TMDb under their terms of service</li>
            <li>• This is an educational project for demonstration purposes</li>
            <li>• Always respect API rate limits and terms of service</li>
          </ul>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🛠️ Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Next.js 14+ (App Router)</li>
              <li>• React 19</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Next.js API Routes</li>
              <li>• Provider Pattern Architecture</li>
              <li>• In-memory Caching (15min TTL)</li>
              <li>• TMDb API Integration</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
