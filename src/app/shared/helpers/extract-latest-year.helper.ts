export const extractLatestYear = (year: string | number): number => {
  if (!isNaN(year as number)) {
    return Number(year);
  }

  const [year1, year2] = (year as string).split(/[-–]/);

  return parseInt(year2 ?? year1);
};
