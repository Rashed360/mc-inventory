const draggableElements = document.querySelectorAll(".draggable")
const droppableElements = document.querySelectorAll(".slot")

draggableElements.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('draging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('draging')
    })
})
  
droppableElements.forEach(slot => {
    slot.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(slot, e.clientY)
        const draggable = document.querySelector('.draging')
        if (afterElement === null) {
            slot.appendChild(draggable)
        } else {
            slot.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(slot, yLoc) {
    const dragableElements = [...document.querySelectorAll('.dragable:not(.draging)')]

    return dragableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect()
        const offset = yLoc - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element
}