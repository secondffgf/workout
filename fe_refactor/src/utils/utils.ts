export type WorkoutType = {
    exercises: any[];
    id: any;
    date: any;
    xaxisLabel: string;
    time: any;
    rounds: any;
    comment: any;
}

export function formatMonthlyChartData(payload: WorkoutType[]) {
   const shortLabel = payload.length > 12
   let chartData = payload.map((workout: WorkoutType) => {
     let exercises = []
     if (workout.exercises && workout.exercises.length > 0) {
       exercises = [...(workout.exercises || [])].sort((a, b) => a.order - b.order)
     }
     return ({
       id: workout.id,
       date: workout.date,
       label: shortLabel ? workout.xaxisLabel.substring(0, 2) : workout.xaxisLabel,
       value: workout.time,
       time: workout.time,
       exercises: exercises,
       rounds: workout.rounds,
       comment: workout.comment
     })
    })

    chartData.sort((a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime())
    return chartData
}