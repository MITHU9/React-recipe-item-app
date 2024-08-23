import { useContext } from "react";
import { GlobalContext } from "../../context/Context";
import RecipeItem from "../../components/recipe-item/RecipeItem";

const Home = () => {
  const { loading, recipeList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {loading ? (
        <h2 className="text-3xl font-bold text-gray-600 text-center">
          Loading....
        </h2>
      ) : recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-bold">
            Nothing to Show. Please Search Something..
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
