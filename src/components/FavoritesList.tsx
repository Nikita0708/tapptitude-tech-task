import type { IRecipe } from "../types/Recipe";
import { RecipeCard } from "../components/RecipeCard";

interface FavoritesListProps {
  favorites: IRecipe[];
  setSelectedRecipe: (recipe: IRecipe) => void;
}

export const FavoritesList = ({
  favorites,
  setSelectedRecipe,
}: FavoritesListProps) => {
  return (
    <div>
      <h2 className="text-3xl font-outfit font-semibold mb-4 text-black">
        Favorites
      </h2>
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 font-outfit">
            You don't have any favorite recipes yet.
          </p>
          <p className="text-gray-500 font-outfit">
            Search for recipes and save them as favorites!
          </p>
        </div>
      ) : (
        <ul>
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              isFavorite={true}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
