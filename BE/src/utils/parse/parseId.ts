export const parseId = (id: string | string[] | undefined): number => {
  if (id === undefined) throw new Error("Id is required!");
  // array case
  const idValue = Array.isArray(id) ? id [0] : id;

  const parsedId = parseInt(idValue, 10);

  if(isNaN(parsedId)){
    throw new Error("Id must be valid number!");
  }
  return parsedId;
};
