export default function Logo() {
  const logoUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/smartnest-sa-logo-4SozQvwRC7AYGTMjDcFgTA.webp";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">SmartNest SA Logo</h1>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <img
            src={logoUrl}
            alt="SmartNest SA Logo"
            className="w-32 h-32 mx-auto"
          />
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">URL:</span>{" "}
            <a
              href={logoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {logoUrl}
            </a>
          </p>
          <p className="text-xs text-gray-400">
            Direct link to the SmartNest SA brand logo asset
          </p>
        </div>

        <a
          href="/"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
