import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function yourRecipes(){
    const [yourRecipes, setYourRecipes] = useState([]);
    useEffect(() => {
        const existAccount = JSON.parse(localStorage.getItem("account"));
    if (!existAccount) {
      navigate("/login");
    }
    fetch("http://localhost:9999/your_recipes?userId=" + existAccount?.id)
      .then((response) => response.json())
      .then((result) => setYourRecipes(result));
    },[])
    function handleRemove(id) {
        if (window.confirm(`Do you want to delete Your recipe with id = ${id}?`)) {
          fetch("http://localhost:8080/your_recipes/" + id, {
            method: "DELETE",
          }).then(() => {
            alert("Remove success!");
            window.location.reload();
          });
        }
      }
    return(
        <Container>
            <Row>
            <Col md={2} className="d-none d-sm-none d-md-block">
              <h3>Your Recipes:</h3>
              <div>
                <form>
                  <table border={1}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Ingredient</th>
                        <th>Instructions</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yourRecipes?.map((y) => (
                        <tr key={y?.id}>
                          <td>{y?.id}</td>
                          <td>{y?.name}</td>
                          <td>{y.ingredients?.map((i, index) => <ol key={index}>{i}</ol>)}</td>
                          <td>{y?.instructions}</td>
                          <td>
                            <a href="#" onClick={() => handleRemove(y?.id)}>
                              {" "}
                              Remove
                            </a>
                          </td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                  <input type="submit" value="Save" />
                </form>
              </div>
            </Col>
            </Row>
        </Container>
    )
}
export default yourRecipes;