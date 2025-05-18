interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  setShowApiKeyModal: (value: boolean) => void;
}

export const ApiKeyModal = ({
  apiKey,
  setApiKey,
  setShowApiKeyModal,
}: ApiKeyModalProps) => (
  <div className="fixed inset-0 bg-[#F5F5F5] bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 font-outfit">
        Enter Your OpenAI API Key
      </h2>
      <p className="mb-4 text-gray-700 font-outfit">
        To use the recipe finder, app would store your api key locally.
      </p>
      <div className="mb-4">
        <label
          htmlFor="apiKey"
          className="block text-sm font-medium text-gray-700 mb-1 font-outfit"
        >
          OpenAI API Key
        </label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 font-outfit focus:border-blue-500"
          placeholder="sk-..."
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowApiKeyModal(false)}
          className="px-4 py-2 bg-[#65558F] text-white rounded-lg font-outfit cursor-pointer"
          disabled={!apiKey.trim().startsWith("sk-")}
        >
          Save Key
        </button>
      </div>
    </div>
  </div>
);
