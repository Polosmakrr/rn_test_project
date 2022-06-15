import axios from "axios";
import { saveAs } from "file-saver";

const key = "E8YL-89-T6rQofcJXu5cZUZcebmd4P05HDBM5ruFg6I";
// ?client_id=E8YL-89-T6rQofcJXu5cZUZcebmd4P05HDBM5ruFg6I
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchByQuerry = (querry, page, fetchParam) => {
  axios
    .get(`search/photos?client_id=${key}&page=${page}&query=${querry}`)
    .then(({ data }) => {
      fetchParam(data.total_pages, data.results);
    })
    .catch((error) => console.log("ERROR:", error));
};

export const fetchPopular = (page, querry, fetchPop) => {
  axios
    .get(`photos?client_id=${key}&page=${page}&order_by=${querry}`)
    .then(({ data }) => {
      fetchPop(data);
    })
    .catch((error) => console.log("ERROR:", error));
};

// export const download = (id) => {
//   axios
//     .get(`photos/${id}/download?client_id=${key}`)
//     .then(({ data }) => {
//       console.log("download", data.url);
//       saveAs(`${data.url}`, `${id}.jpg`);
//     })

//     .catch((error) => console.log("ERROR:", error));
// };
