export class Todo {
    id?: string;
    title?: string;
    date?: string;
    done?: boolean;
    

    constructor(data?: {
        id?: string,
        title?: string,
        date?: string,
        done?: boolean,
    } | Todo) {
        if(data) {
            this.id = data.id;
            this.title = data.title;
            this.date = data.date;
            this.done = data.done;
        }
    }
}