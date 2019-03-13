export class Task {
    taskId: number;
    taskName: string;
    parentId: number;
    projectId: number;
    userId:number;
    parent: Task;
    startDate: Date;
    endDate: Date;
    priority: number;
    isParentTask: boolean;
}
