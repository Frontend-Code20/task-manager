
// Helper function to create task object
export function getTaskObject(form, progrs) {

    const formData = new FormData(form);

    const title = formData.get('title');
    const progress = progrs;
    const assignedTo = formData.get('assignedTo');
    const priority = formData.get('priority');
    const date = new Date();
    const deadline = formData.get('deadline');
    const status = formData.get('status');
    const startDate = formData.get('startingDate');
    const endDate = formData.get('completionDate');

    return { title, progress, assignedTo, priority, date, deadline, status, startDate, endDate }
}