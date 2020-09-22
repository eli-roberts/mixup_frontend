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
  get(collection, id) {
    return fetch(`${url}/${collection}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then(response => response.json())
  },
  post(collection, postData) {
    return fetch(`${url}/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
  },
  getCreator(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }

    })
    .then(creator => creator.json())
  }
}