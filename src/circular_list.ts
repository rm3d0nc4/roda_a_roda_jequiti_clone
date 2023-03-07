class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class CircularList<T> {
    head: ListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this;this.size = 0;
    }


    insert(data: T) {
        let node: ListNode<T> = new ListNode<T>(data);

        if(this.head == null) {
            this.head = node;
            node.next = node;
        } else {
            let lastNode = this.head.next;
            node.next = lastNode!.next;
            lastNode!.next = node;
        }
        this.size++;
    }

    next(): T | null {
        if(this.head == null) {
            return null;
        } else {
            this.head = this.head.next;
            return this.head!.data;
        }
    }

    toArray(): Array<T> {
        let array: Array<T> = new Array<T>();
        let current: ListNode<T> = this.head!.next!;
        array[0] = this.head!.data;
        while(current != this.head) {
            array.push(current.data);
            current = current.next!;
        }
        return array;
    }
}


// let lista:CircularList<number> = new CircularList<number>;
// lista.insert(1);
// lista.insert(2);
// lista.insert(3);

// console.log(lista.next());
// console.log(lista.next());
// console.log(lista.next());
// console.log(lista.toArray());