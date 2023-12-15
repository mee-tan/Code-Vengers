export async function validData({
  productname,
  description,
  category,
  quantity,
  price,
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        productname.trim() !== "" &&
        description.trim() !== "" &&
        category.trim() !== "" &&
        !isNaN(quantity) &&
        !isNaN(price)
      ) {
        resolve(); // Resolve the promise if all data is valid.
      } else if (
        !isNaN(productname) &&
        !isNaN(description) &&
        isNaN(quantity) &&
        isNaN(price)
      ) {
        resolve();
      } else {
        reject(); // Reject the promise if any data is invalid.
      }
    }, 1000);
  });
}
