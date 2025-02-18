import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [yourRecipes, setYourRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/recipes").then((res) => res.json()),
      fetch("http://localhost:9999/users").then((res) => res.json()),
      fetch("http://localhost:9999/your_recipes").then((res) => res.json()),
    ])
      .then(([recipesData, usersData, yourRecipesData]) => {
        setRecipes(recipesData);
        setUsers(usersData);
        setYourRecipes(yourRecipesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("account");
    sessionStorage.removeItem("account");
    console.log("User logged out successfully!");
    navigate("/");
  };

  const handleAddRecipe = (recipe) => {
    setYourRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  function handleRemove(id) {
    if (window.confirm(`Do you want to delete recipe with ID = ${id}?`)) {
      fetch(`http://localhost:9999/your_recipes/${id}`, {
        method: "DELETE",
      }).then(() => {
        alert("Recipe removed successfully!");
        setYourRecipes(yourRecipes.filter((item) => item.id !== id));
      });
    }
  }

  const handleSaveToDatabase = () => {
    const currentUser = JSON.parse(localStorage.getItem("account"));
    if (!currentUser) {
      alert("You need to log in to save recipes.");
      return;
    }

    const formattedData = yourRecipes.map((recipe) => ({
      userid: currentUser.id,
      recipeid: recipe.id,
    }));

    fetch("http://localhost:9999/your_recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Recipes saved successfully!");
      })
      .catch((error) => console.error("Error saving recipes:", error));
  };

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.tags?.join("").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rating - b.rating;
      if (sortOrder === "desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h1>Recipes Management</h1>
          <input
            type="text"
            placeholder="Search by tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-3"
          />
          <label>Sort By Rating: </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort Rating</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <a className="offset-9" href="/" onClick={handleLogout}>
            Logout
          </a>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Tags</th>
                <th>User</th>
                <th>Rating</th>
                <th>Functions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td>{recipe.name}</td>
                    <td>
                      <ol>
                        {recipe.tags?.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </ol>
                    </td>
                    <td>
                      {users.find((u) => u.id === recipe.userId)?.firstName ||
                        "Unknown"}
                    </td>
                    <td>{recipe.rating}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddRecipe(recipe)}
                      >
                        Add Your Recipes
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No recipes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <h1>My Recipes</h1>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Instructions</th>
                <th>Functions</th>
              </tr>
            </thead>
            <tbody>
              {yourRecipes.length > 0 ? (
                yourRecipes.map((yourrecipe) => (
                  <tr key={yourrecipe.id}>
                    <td>{yourrecipe.id}</td>
                    <td>{yourrecipe.name}</td>
                    <td>
                      {yourrecipe.ingredients.map((ingre, index) => (
                        <div key={index}>{ingre}</div>
                      ))}
                    </td>
                    <td>
                      {yourrecipe.instructions
                        ?.slice(0, 4)
                        .map((instruc, index) => (
                          <div key={index}>{instruc}</div>
                        ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(yourrecipe.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={handleSaveToDatabase}>
            Save to Database
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
