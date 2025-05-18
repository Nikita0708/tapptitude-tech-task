import { ChevronLeft, Heart } from "lucide-react";
import type { IRecipe } from "../types/Recipe";
import RecipeImg from "../assets/recipe.png";

interface RecipeProps {
  setSelectedRecipe: (recipe: IRecipe | null) => void;
  selectedRecipe: IRecipe;
  toggleFavorite: (recipe: IRecipe) => void;
  isRecipeFavorite: (recipeId: string) => boolean;
}

export const Recipe = ({
  setSelectedRecipe,
  selectedRecipe,
  toggleFavorite,
  isRecipeFavorite,
}: RecipeProps) => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <div className="p-4 text-white flex items-center">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mr-2 p-2 rounded-full cursor-pointer"
          >
            <ChevronLeft size={20} className="text-black" />
          </button>
          <h1 className="text-2xl text-black font-bold font-outfit">
            Recipe Details
          </h1>
        </div>

        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img
              src={RecipeImg}
              alt="Recipe"
              className="max-h-full rounded-lg mb-[40px]"
            />
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 font-outfit">
                  {selectedRecipe.name}
                </h2>

                <div className="flex items-center text-gray-600 mb-4">
                  <span className="font-outfit">
                    {selectedRecipe.cookTime} min.
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(selectedRecipe)}
                className={`px-4 py-2 cursor-pointer ${
                  isRecipeFavorite(selectedRecipe.id)
                    ? "text-[#65558F]"
                    : "text-black"
                }`}
              >
                <Heart
                  size={24}
                  fill={
                    isRecipeFavorite(selectedRecipe.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>
          </div>

          <div className="md:w-1/2 p-6 ">
            <div className="mb-6">
              <h3 className="text-xl font-outfit mb-3 font-semibold text-gray-800">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start font-outfit">
                    <span className="inline-block h-1 w-1 rounded-full bg-black mt-[10px] mr-2 font-outfit"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 font-outfit">
                Instructions
              </h3>
              <ol className="space-y-4">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold mr-2 font-outfit">
                      {index + 1}.
                    </span>
                    <span className="font-outfit">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
