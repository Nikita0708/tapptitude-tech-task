import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ApiKeyConfig } from "../components/ApiKeyConfig";
import { FavoritesList } from "../components/FavoritesList";
import { RecipeResults } from "../components/RecipeResults";
import { Recipe } from "./Recipe";
import { ApiKeyModal } from "../components/ApiKeyModal";
import { useRecipes } from "../hooks/useRecipes";
import type { IRecipe } from "../types/Recipe";

export const Home = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("openai_api_key") || "";
  });

  const {
    recipes,
    isLoading,
    isError,
    error,
    favorites,
    showApiKeyModal,
    setShowApiKeyModal,
    toggleFavorite,
    isRecipeFavorite,
    handleRegenerate,
  } = useRecipes(searchPrompt, apiKey);

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem("openai_api_key", newKey);
  };

  if (selectedRecipe) {
    return (
      <Recipe
        setSelectedRecipe={setSelectedRecipe}
        selectedRecipe={selectedRecipe}
        toggleFavorite={toggleFavorite}
        isRecipeFavorite={isRecipeFavorite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {showApiKeyModal && (
        <ApiKeyModal
          apiKey={apiKey}
          setApiKey={handleApiKeyChange}
          setShowApiKeyModal={setShowApiKeyModal}
        />
      )}

      <div className="max-w-[400px] mx-auto">
        <SearchBar
          searchPrompt={searchPrompt}
          setSearchPrompt={setSearchPrompt}
        />

        <ApiKeyConfig setShowApiKeyModal={setShowApiKeyModal} />

        {searchPrompt.length === 0 ? (
          <FavoritesList
            favorites={favorites}
            setSelectedRecipe={setSelectedRecipe}
          />
        ) : (
          <RecipeResults
            isLoading={isLoading}
            isError={isError}
            error={error}
            recipes={recipes}
            isRecipeFavorite={isRecipeFavorite}
            setSelectedRecipe={setSelectedRecipe}
            handleRegenerate={handleRegenerate}
          />
        )}
      </div>
    </div>
  );
};
