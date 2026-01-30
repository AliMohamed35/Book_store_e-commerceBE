export const parseId = (id: string | undefined): number => {
  if (id === undefined) throw new Error("Id is required!");
  const parsedId = parseInt(id, 10);

  if(!isNaN(parsedId)){
    throw new Error("Id must be valid number!");
  }
  return parsedId;
};
