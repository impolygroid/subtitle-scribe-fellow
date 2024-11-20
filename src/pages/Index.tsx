const Index = () => {
  return (
    <div className="w-[300px] p-4">
      <h1 className="text-xl font-bold mb-4">Subtitle Learning Assistant</h1>
      <p className="text-gray-600 text-sm">
        Upload an SRT file on any webpage to view subtitles and practice pronunciation.
      </p>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h2 className="font-semibold text-sm mb-2">How to use:</h2>
        <ol className="text-sm text-gray-600 list-decimal pl-4">
          <li>Navigate to any webpage</li>
          <li>Click "Choose File" in the subtitle viewer</li>
          <li>Select your .srt file</li>
          <li>Use the speak button to practice pronunciation</li>
        </ol>
      </div>
    </div>
  );
};

export default Index;