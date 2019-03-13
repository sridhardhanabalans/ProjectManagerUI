import { Task } from "src/app/models/task";

export class Project {
    projectId: number;
    projectName: string;
    projectStartDate: Date;
    projectEndDate: Date;
    projectPriority: number;
    projectUserId: number;
    projectTotalTasks: number;
    projectTasksCompleted: number;
}
