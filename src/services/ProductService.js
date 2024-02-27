import md5 from "md5";

const getPassword = () => {
  let day = String(new Date().getDate());
  let month = 0 + String(new Date().getMonth() + 1);
  let year = String(new Date().getFullYear());
  let date = year + month + day;
  return md5(`Valantis_${date}`);
};

const password = getPassword();
const url = new URL("https://api.valantis.store:41000/")

const fetchProductId = async (index) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": password,
      },
      body: JSON.stringify({
        action: "get_ids",
        params: { limit: 10, offset: 10 * index - 10 },
      }),
    }).then((res) => res.json());

    let ids = response.result;

    return ids;
  } catch (error) {
    console.error("Error fetching ids:", error);
  }
};

const getItems = async (ids) => {
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": password,
      },
      body: JSON.stringify({
        action: "get_items",
        params: { ids: ids },
      }),
    }).then((res) => res.json());

    if (!data.result) {
      return [];
    }

    const uniqueProducts = data.result.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );

    return uniqueProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const filterFetch = async (filter) => {
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": password,
      },
      body: JSON.stringify({
        action: "filter",
        params: filter,
      }),
    }).then((res) => res.json());

    if (!data.result) {
      return [];
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
  }
};

const fetchProducts = async (index, filter) => {
  let ids;
  if (filter) {
    ids = await filterFetch(filter);
  } else {
    ids = await fetchProductId(index);
  }
  const data = await getItems(ids);
  return data;
};

export default fetchProducts;
