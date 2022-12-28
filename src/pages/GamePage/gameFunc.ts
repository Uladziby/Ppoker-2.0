//Function change position timer after click NextIssue
  let counterTranslate = 0
  let startPositionTimer = 0
  const shiftTimeronDown = 84

export function onShiftTimer(lengthIssues: number) {

  

    let timer = document.getElementById('timer')!
    if (lengthIssues === 0) {
      timer.style.transform = `translate(0, ${0}px)`
    }
    if (counterTranslate < lengthIssues - 1) {
      timer.style.transform = `translate(0, ${
        startPositionTimer + shiftTimeronDown
      }px)`
      counterTranslate = +1
      startPositionTimer = +shiftTimeronDown

    }
  
}
