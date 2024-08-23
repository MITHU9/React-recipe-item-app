/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/Context";

const Details = () => {
  const params = useParams();
  const { recipeDetails, setRecipeDetails, addToFavorites, favorites } =
    useContext(GlobalContext);
  //console.log(params);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`
      );
      const data = await response.json();
      //console.log(data);
      if (data?.data?.recipe) {
        setRecipeDetails(data.data.recipe);
      }
    };

    fetchRecipeDetails();
  }, [params.id]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.image_url}
            alt="recipe-item"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetails?.publisher}
        </span>
        <h2 className="text-2xl font-semibold truncate pb-4">
          {recipeDetails?.title}
        </h2>
        <div>
          <button
            className="text-sm p-3 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
            onClick={() => addToFavorites(recipeDetails)}
          >
            {favorites &&
            favorites.length > 0 &&
            favorites.findIndex((item) => item.id === recipeDetails.id) !== -1
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-gray-700">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3 py-3">
            {recipeDetails?.ingredients.map((ingredient, index) => (
              <li className="text-xl text-semibold text-gray-500" key={index}>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span> {ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
