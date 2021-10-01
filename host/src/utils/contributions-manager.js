let contributions = [];

export const addContributions = (c) => {
  contributions = [...contributions, ...c];
};

export const getContributions = (id) =>
  contributions.filter((c) => {
    const { contributionId } = c;
    return contributionId === id;
  });
