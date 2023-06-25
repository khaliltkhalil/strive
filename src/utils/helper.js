function createBarChartData(workouts) {
  const chartData = {};
  workouts.forEach((workout) => {
    const date = new Date(workout.date);
    const year = date.getFullYear();

    const month = date.toLocaleString("default", {
      month: "short",
    });

    // if year doesnt exist in chartData add it
    if (!chartData[year]) {
      chartData[year] = [
        {
          month: "Jan",
          numOfWorkouts: 0,
        },
        {
          month: "Feb",
          numOfWorkouts: 0,
        },
        {
          month: "Mar",
          numOfWorkouts: 0,
        },
        {
          month: "Apr",
          numOfWorkouts: 0,
        },
        {
          month: "May",
          numOfWorkouts: 0,
        },
        {
          month: "Jun",
          numOfWorkouts: 0,
        },

        {
          month: "Jul",
          numOfWorkouts: 0,
        },
        {
          month: "Aug",
          numOfWorkouts: 0,
        },
        {
          month: "Sep",
          numOfWorkouts: 0,
        },
        {
          month: "Oct",
          numOfWorkouts: 0,
        },
        {
          month: "Nov",
          numOfWorkouts: 0,
        },
        {
          month: "Dec",
          numOfWorkouts: 0,
        },
      ];
    }
    // find the month in the year and increase the number of workouts
    chartData[year].forEach((mon) => {
      if (mon["month"] === month) {
        mon["numOfWorkouts"] += 1;
      }
    });
  });

  return chartData;
}

export { createBarChartData };
