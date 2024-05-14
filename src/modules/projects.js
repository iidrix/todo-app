function projects() {

    const newProject = (title) => {
        return {
            title: title,
            assignedTasks: [],
        }
    }

    return { newProject };
}



export { projects };