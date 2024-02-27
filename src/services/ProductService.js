import md5 from "md5";

const getPassword = () => {
  let day = String(new Date().getDate());
  let month = 0 + String(new Date().getMonth() + 1);
  let year = String(new Date().getFullYear());
  let date = year + month + day;
  return md5(`Valantis_${date}`);
};

const password = getPassword();

const fetchProductId = async (index) => {
  try {
    const response = await fetch("https://api.valantis.store:41000/", {
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

const getItems = async (filter, ids) => {
  let body = JSON.stringify({
    action: "get_items",
    params: { ids: ids },
  });

  if (filter) {
    body = JSON.stringify({
      action: "filter",
      params: filter,
    });
  }

  try {
    const data = await fetch("https://api.valantis.store:41000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": password,
      },
      body: body,
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

const fetchProducts = async (index, filter) => {
  const ids = await fetchProductId(index);
  console.log(ids);
  const data = await getItems(filter, ids);
  console.log(data);
  return data;
};

export default fetchProducts;
