import { Loader2 } from "lucide-react";
import type { IRecipe } from "../types/Recipe";
import { RecipeCard } from "../components/RecipeCard";

interface RecipeResultsProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  recipes: IRecipe[] | undefined;
  isRecipeFavorite: (id: string) => boolean;
  setSelectedRecipe: (recipe: IRecipe) => void;
  handleRegenerate: () => void;
}

export const RecipeResults = ({
  isLoading,
  isError,
  error,
  recipes,
  isRecipeFavorite,
  setSelectedRecipe,
  handleRegenerate,
}: RecipeResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-[#65558F] animate-spin" />
        <span className="ml-2 text-gray-600 font-outfit">
          Generating recipe suggestions...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load recipes. Please try again."}
        </p>
      </div>
    );
  }

  if (recipes && recipes.length > 0) {
    return (
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-black font-outfit">
          Suggested Recipes
        </h2>
        <ul>
          {recipes.map((recipe: IRecipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              isFavorite={isRecipeFavorite(recipe.id)}
            />
          ))}
        </ul>
        <div className="text-center mt-4">
          <button
            onClick={handleRegenerate}
            className="px-6 py-3 bg-[#65558F] text-[#F5F5F5] rounded-xl font-outfit cursor-pointer"
          >
            I don't like these
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12 bg-white font-outfit rounded-lg shadow-sm">
      <p className="text-gray-500">No recipes found. Try a different search.</p>
    </div>
  );
};
