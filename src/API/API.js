export const fetchApartaments = async () => {
  const data = await fetch('http://localhost:3001/getAparts');
  const response = await data.json();
  return response;
}

export const fetchApartament = async (id) => {
  const data = await fetch(`http://localhost:3001/getApartById?id=${id}`);
  const response = await data.json();
  return response;
}