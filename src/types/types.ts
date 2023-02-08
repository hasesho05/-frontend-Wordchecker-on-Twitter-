export interface Option {
  responsive: boolean,
  plugins: {
    title: {
      display: boolean,
      text: string,
    }
  }
}

export interface GraphData {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number,
  }[],
  options: {
    scales: {
      yaxes_1: {
        beginAtZero: boolean,
      }
    }
  }
}