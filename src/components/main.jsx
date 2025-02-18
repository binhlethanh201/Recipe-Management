import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [displayRecipe, setDisplayRecipe] = useState(false);
  const [itemId, setItemId] = useState();
  const [yourRecipes, setYourRecipes] = useState([]);
  const [yournewRecipes, setYourNewRecipes] = useState([]);
  const userId = localStorage.getItem("account");

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:9999/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []); // Fetch recipes only once on mount

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:9999/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []); // Fetch users only once on mount

  // Filter recipes based on searchInput
  useEffect(() => {
    const searchData = recipes.filter(
      (recipe) =>
        searchInput === "" ||
        recipe?.tags?.some((tag) =>
          tag.toLowerCase().includes(searchInput.toLowerCase())
        )
    );
    setFilterRecipes(searchData);
  }, [searchInput, recipes]); // Re-run when searchInput or recipes change

  // Sorting recipes by rating
  const sortedRecipes = (e) => {
    console.log(e);
    const sortOrder = e === "asc";
    const sortedList = sortOrder
      ? [...filterRecipes].sort((a, b) => a?.rating - b?.rating)
      : [...filterRecipes].sort((a, b) => b?.rating - a?.rating);

    setFilterRecipes(sortedList);
  };

  // Function to handle displaying recipes and updating states
  const displayRecipesTable = async (e, itemIdParamater) => {
    e.preventDefault();
    try {
      // Otherwise, show the vote and set the new itemId
      setDisplayRecipe(true);
      setItemId(itemIdParamater);

      // Find the recipe based on itemIdParamater
      const recipeRes = recipes.find((item) => item.id === itemIdParamater);

      // Check if the recipe already exists in the user's list of recipes
      const checkRecipeExist = yourRecipes.find(
        (item) => item.recipe[0].id === itemIdParamater
      );

      // If the recipe exists, show an alert
      if (checkRecipeExist) {
        console.log("co");
        alert("This recipe already exists!");
        return false;
      } else {
        console.log("ko");
        // Otherwise, add the new recipe to the user's list
        const newRecipe = {id: yourRecipes.length + 1, // Generate a new id for the recipe
            recipe: [
              {
                id: recipeRes.id,
                name: recipeRes.name,
                ingredients: recipeRes.ingredients,
                instructions: recipeRes.instructions
                // Add any other fields from the recipeRes you want to include
              }
            ],
            userId: JSON.parse(userId).id
          };
  
          // Update the user's recipes list by adding the new recipe
          setYourRecipes((prevYourRecipes) => [...prevYourRecipes, newRecipe]);
  
          console.log("Updated your recipes:", yourRecipes);
        }
      } catch (error) {
        console.error("Error handling recipe display:", error);
        alert("An error occurred while processing the recipe.");
      }
    };
    const handleSave = async () => {
      try {
        const updatePromises = yournewRecipes?.map(async (item) => {
          const newItem = {
            ...item,
            id: Number(item.id)
          };
  
          try {
            const res = await axios.post(
              "http://localhost:9999/your_recipes",
              newItem
            );
  
            if (res.status === 201) {
              return newItem;
            } else {
              throw new Error("Failed to save recipe");
            }
          } catch (err) {
            console.error("Error updating recipe:", err);
            return null;
          }
        });
  
        await Promise.all(updatePromises);
  
        setYourRecipes([]);
  
        setYourNewRecipes([]);
  
        alert("Recipes saved successfully!");
      } catch (error) {
        console.log("Error during the update process:", error);
        alert("An error occurred while saving recipes.");
      }
    };
    const removeRecipe = (recipeId) => {
      const updatedRecipes = yourRecipes.filter((item) => item.id !== recipeId);
      setYourRecipes(updatedRecipes);
    };
    const navigate = useNavigate();
    function logout() {
      localStorage.removeItem("account");
      navigate("/");
    }
    return (
      <Container>
        <h3 className="text-center">Recipes Management</h3>
        {/* <button className="btn btn-success" onClick={() => logout()}>Logout</button> */}
        {/* Search */}
        <Row className="my-3">
          <Form.Control
            placeholder="Enter tag to search.."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Row>
  
        {/* Sort by rating */}
        <Row className="my-3">
          <Col xs={2}>Sort by Rating</Col>
          <Col>
            <select onChange={(e) => sortedRecipes(e.target.value)}>
              <option value={"asc"}>ASC</option>
              <option value={"desc"}>DESC</option>
            </select>
          </Col>
        </Row>
  
        {/* Recipe table */}
        <Row>
          <Col xs={yourRecipes.length !== 0 ? 9 : 12}>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Tags</th>
                  <th>User</th>
                  <th>Rating</th><th>Func</th>
              </tr>
            </thead>
            <tbody>
              {filterRecipes?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.tags.map((tag, index) => (
                      <div key={index}>
                        <span>{tag}</span>
                      </div>
                    ))}
                  </td>
                  <td>
                    <span>
                      {
                        users?.find((u) => parseInt(u?.id) === item.userId)
                          ?.firstName
                      }
                    </span>
                    <span>
                      {
                        users?.find((u) => parseInt(u?.id) === item.userId)
                          ?.lastName
                      }
                    </span>
                  </td>
                  <td>{item.rating}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={(e) => displayRecipesTable(e, item.id)}
                    >
                      Add Your Recipes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        {/* voting */}
        <Col xs={3}>
          <h3>
            Your Recipes: {yourRecipes.length === 0 ? <div>Empty</div> : ""}
          </h3>
          {/* Render the table only if yourRecipes has data */}
          {yourRecipes.length > 0 && (
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Function</th>
                  </tr>
                </thead>
                <tbody>
                  {yourRecipes?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.recipe[0]?.name}</td>
                      <td>
                        {item.recipe[0]?.ingredients?.slice(0, 4)?.map((ingre, index) => (
                          <div key={index}>{ingre}</div>
                        ))}
                      </td>
                      <td>
                        {item.recipe[0]?.instructions?.slice(0, 4)?.map((instruc, index) => (
                          <div key={index}>{instruc}</div>
                        ))}
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() => removeRecipe(item.id)}
                        >
                          Remove
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="btn btn-success mt-3"
                onClick={() => handleSave()}
              >
                Save
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;