const url = "http://localhost:8000"

export default {
  getAll(collection) {
    return fetch(`${url}/${collection}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
        .then(response => response.json())
  },

}