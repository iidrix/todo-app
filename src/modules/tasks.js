function createTask(title, description, dueDate, priority, project = "default") {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        project: project,
    }
}

export default createTask;