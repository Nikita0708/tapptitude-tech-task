interface ApiKeyConfigProps {
  setShowApiKeyModal: (show: boolean) => void;
}

export const ApiKeyConfig = ({ setShowApiKeyModal }: ApiKeyConfigProps) => {
  return (
    <div className="flex justify-start mb-4">
      <button
        onClick={() => setShowApiKeyModal(true)}
        className="text-sm text-[#65558F] font-outfit cursor-pointer"
      >
        Configure API Key
      </button>
    </div>
  );
};
