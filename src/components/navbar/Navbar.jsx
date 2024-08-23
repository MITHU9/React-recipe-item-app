import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Context";

const Navbar = () => {
  const { searchItem, setSearchItem, handleSubmit } = useContext(GlobalContext);

  //console.log(searchItem);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row">
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>FoodRecipe</NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search for recipes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="bg-white/75 border px-8 p-3 rounded-full focus:outline-none
        lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200
        focus:border-red-400 font-semibold"
        />
      </form>

      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"./"}
            className="text-black font-semibold hover:text-gray-600 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"./favorites"}
            className="text-black font-semibold hover:text-gray-600 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
