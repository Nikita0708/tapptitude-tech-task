import { Search } from "lucide-react";

interface SearchBarProps {
  searchPrompt: string;
  setSearchPrompt: (value: string) => void;
}

export const SearchBar = ({
  searchPrompt,
  setSearchPrompt,
}: SearchBarProps) => {
  return (
    <div className="relative mb-8 max-w-[400px]">
      <input
        type="text"
        className="block w-full max-w-[400px] h-[40px] p-4 text-md font-outfit border border-[#D9D9D9] rounded-3xl text-[#1E1E1E] bg-white focus:outline-[#65558F]"
        placeholder="What do you feel like eating?"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="w-5 h-5 text-[#1E1E1E]" />
      </div>
    </div>
  );
};
