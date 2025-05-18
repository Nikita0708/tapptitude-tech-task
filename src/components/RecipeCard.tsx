import { Heart } from "lucide-react";
import RecipePathImg from "../assets/recipe.png";
import type { IRecipe } from "../types/Recipe";

interface RecipeCard {
  onClick: () => void;
  recipe: IRecipe;
  isFavorite: boolean;
}

export const RecipeCard = ({ onClick, recipe, isFavorite }: RecipeCard) => {
  return (
    <li
      className="bg-[#E0E0E0] max-w-[400px] h-[88px] rounded-3xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition flex items-center pr-[15px] mb-[16px]"
      onClick={onClick}
    >
      <img src={RecipePathImg} alt={recipe.name} className="max-h-full" />
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 line-clamp-2 font-outfit">
          {recipe.name}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <span className="text-sm font-outfit">{recipe.cookTime} min.</span>
          </div>
        </div>
      </div>
      {isFavorite && (
        <Heart
          size={20}
          className="text-[#65558F] ml-auto"
          fill="currentColor"
        />
      )}
    </li>
  );
};
