const getNameSortAtoB = (data) => {
  return (
    data
      // .filter((d) => d.type === type)
      .sort((a, b) => {
        const nameA = a.desc.toUpperCase(); // ignore upper and lowercase
        const nameB = b.desc.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
  );
};

export default getNameSortAtoB;
