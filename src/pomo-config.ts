export class Result {
  pomodoroCount: number
  longBreaks: number
  totalWorkTimeHours: number
  totalWorkTimeMins: number

  constructor(
    pomodoroCount: number,
    longBreaks: number,
    totalWorkTimeHours: number,
    totalWorkTimeMins: number
  ) {
      this.pomodoroCount = pomodoroCount
      this.longBreaks = longBreaks
      this.totalWorkTimeHours = totalWorkTimeHours
      this.totalWorkTimeMins = totalWorkTimeMins
  }
}

export default class PomoConfig {
  pomodoroLength: number
  shortBreakLength: number
  longBreakLength: number
  longBreakInterval: number
  startTime: string
  endTime: string
  pomosPerSuperBlock: number

  totalTime: number
  pomodoroCount: number
  pomoPlusBreak: number
  superBlock: number
  longBreaks: number
  totalWorkTime: number
  totalWorkTimeHours: number
  totalWorkTimeMins: number

  constructor(
    pomodoroLength: number,
    shortBreakLength: number,
    longBreakLength: number,
    longBreakInterval: number,
    startTime: string,
    endTime: string
  ) {
    this.pomodoroLength = pomodoroLength
    this.shortBreakLength = shortBreakLength
    this.longBreakLength = longBreakLength
    this.longBreakInterval = longBreakInterval
    this.startTime = startTime
    this.endTime = endTime
    this.pomosPerSuperBlock = longBreakInterval

    this.totalTime = 0
    this.pomodoroCount = 0
    this.pomoPlusBreak = 0
    this.superBlock = 0
    this.longBreaks = 0
    this.totalWorkTime = 0
    this.totalWorkTimeHours = 0
    this.totalWorkTimeMins = 0
  }

  validateInputs() {
    if (
      isNaN(this.pomodoroLength) ||
      isNaN(this.shortBreakLength) ||
      isNaN(this.longBreakLength) ||
      isNaN(this.longBreakInterval)
    ) {
      alert("Please enter valid numbers for Pomodoro and break lengths.")
      return false
    }
    if (this.startTime === "" || this.endTime === "") {
      alert("Please enter start and end times.")
      return false
    }
    return true
  }

  init() {
    this.initPomo()
    this.initTotalTime()
  }

  initTotalTime() {
    const start = new Date(`2023-01-01 ${this.startTime}`)
    const end = new Date(`2023-01-01 ${this.endTime}`)
    this.totalTime = (end - start) / (1000 * 60) // in minutes
  }

  initPomo() {
    this.pomodoroCount = 0
    this.pomoPlusBreak = this.pomodoroLength + this.shortBreakLength
    this.superBlock =
      this.pomosPerSuperBlock * this.pomoPlusBreak +
      (this.longBreakLength - this.shortBreakLength)
  }

  calcPomosWithSuperBlocks() {
    if (this.longBreakInterval == 0) {
      return;
    }

    while (this.totalTime >= this.superBlock) {
      this.pomodoroCount += this.pomosPerSuperBlock
      this.totalTime -= this.superBlock
    }
  }

  calcPomosWithoutSuperBlocks() {
    while (this.totalTime >= this.pomoPlusBreak) {
      this.pomodoroCount++
      this.totalTime -= this.pomoPlusBreak
    }
    if (this.totalTime == this.pomodoroLength) {
      this.pomodoroCount++
    }
  }

  calcLongBreaks() {
    this.longBreaks = 0;
    if (this.longBreakLength > 0 && this.longBreakInterval != 0) {
      this.longBreaks = Math.floor(this.pomodoroCount / this.longBreakInterval)
      // Ignore last long break
      if (this.pomodoroCount % this.longBreakInterval == 0) {
        this.longBreaks--
      }
    }
  }

  calcResult() {
    this.totalWorkTime = this.pomodoroLength * this.pomodoroCount
    this.totalWorkTimeHours = Math.floor(this.totalWorkTime / 60)
    this.totalWorkTimeMins = this.totalWorkTime - 60 * this.totalWorkTimeHours
  }

  calcPomos() {
    this.init()
    this.calcPomosWithSuperBlocks()
    this.calcPomosWithoutSuperBlocks()
    this.calcLongBreaks()
    this.calcResult()

    const res = new Result(
      this.pomodoroCount,
      this.longBreaks,
      this.totalWorkTimeHours,
      this.totalWorkTimeMins
    )
    return res
  }
}
