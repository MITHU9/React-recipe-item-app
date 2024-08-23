/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext({
  searchItem: "",
  recipeList: [],
  loading: false,
  recipeDetails: null,
  favorites: [],
  addToFavorites: () => {},
  setRecipeDetails: () => {},
  setSearchItem: () => {},
  handleSubmit: () => {},
});

const GlobalProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}`
      );
      const data = await response.json();
      //console.log(data.data.recipes);
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchItem("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchItem("");
    }
  };

  const addToFavorites = (recipe) => {
    //console.log(recipe);
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex((item) => item.id === recipe.id);

    if (index === -1) {
      newFavorites.push(recipe);
    } else {
      newFavorites.splice(index);
    }
    setFavorites(newFavorites);
  };

  //console.log(loading, recipeList);

  return (
    <GlobalContext.Provider
      value={{
        searchItem,
        loading,
        recipeList,
        recipeDetails,
        favorites,
        setRecipeDetails,
        setSearchItem,
        handleSubmit,
        addToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
