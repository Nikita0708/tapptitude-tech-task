import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { callOpenAI } from "../api/callOpenAI";
import type { IRecipe } from "../types/Recipe";

export const useRecipes = (searchPrompt: string, apiKey: string) => {
  const [regenerate, setRegenerate] = useState(false);
  const [favorites, setFavorites] = useState<IRecipe[]>([]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteRecipes");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    if (!localStorage.getItem("openai_api_key")) {
      setShowApiKeyModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
  }, [favorites]);

  const {
    data: recipes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes", searchPrompt, regenerate],
    queryFn: async () => {
      if (!apiKey) {
        setShowApiKeyModal(true);
        throw new Error("OpenAI API key is required");
      }

      return await callOpenAI(searchPrompt, apiKey);
    },
    enabled: searchPrompt.length > 0 && apiKey.length > 0,
  });

  const toggleFavorite = (recipe: IRecipe) => {
    const isFavorite = favorites.some((fav) => fav.id === recipe.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, { ...recipe, isFavorite: true }]);
    }
  };

  const isRecipeFavorite = (recipeId: string) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const handleRegenerate = () => {
    setRegenerate(!regenerate);
    refetch();
  };

  return {
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
  };
};
