import React, { useState, useEffect } from "react";
import api from "../api";
function Categories() {
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

  const getCategories = async () => {
    const response = await api.get("/categories");
    setCategories(response.data);
  };

  const getGroups = async () => {
    const response = await api.get("/groups");
    setGroups(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = {
      name: event.target.name.value,
      group: {
        id: event.target.group.value,
      },
    };

    const response = await api
      .post("/categories", value)
      .catch((err) => console.log(err));
    setCategories([...categories, response.data]);
  };

  useEffect(() => {
    getCategories();
    getGroups();
  }, []);

  return (
    <div className="container">
      <h1>Categories</h1>
      <div className="row">
        <h3>Add new Category</h3>
      </div>
      <div className="row">
        <div className="one-third column">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="twelve columns">
                <label htmlFor="nameInput">Name</label>
                <input
                  className="u-full-width"
                  type="text"
                  name="name"
                  placeholder="Streaming"
                  id="nameInput"
                />
              </div>
            </div>
            <div className="row">
              <div className="twelve columns">
                <label htmlFor="groupInput">Group</label>
                <select name="group" className="u-full-width" id="groupInput">
                  <option value="">Select</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input className="button-primary" type="submit" value="Submit" />
          </form>
        </div>
        <div className="two-thirds column">
          <div className="row">
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Group</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.group.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
