public class LinkedSeq {
    private class Node{
        int data;
        Node  next;
        public Node(int data){
            this.data=data;
            this.next=null;
        }
    }
    private Node head;
    private Node current;


    // initializing the list
    public LinkedSeq(){
        head=null;
        current=null;
    }
    
    public void start(){
        current=head;
    }

    public boolean isCurrent(){
        return current!=null;
    }

    public void advance(){
        if(!(isCurrent())){
            throw new IllegalStateException("No current element");
        }
        current=current.next;
    }
    public void removeCurrent(){
        if(!isCurrent()){
            throw new IllegalStateException("No current element");
        }
        if(current==head){
            head = head.next;
        }else{
            Node tmp = head;
            while (tmp.next != current) {
                tmp = tmp.next;
            }
            tmp.next = current.next;
        }
        current=null;
    }

     public void addAfter(int element) {
        Node newNode = new Node(element);
        if (head == null) {
            head = newNode;
            current = head;
        } else {
            newNode.next = current.next;
            current.next = newNode;
            current = newNode;
        }
    }

    public void addBefore(int element) {
        Node newNode = new Node(element);
        if (current == head) {
            newNode.next = head;
            head = newNode;
            current = head;
        } else {
            Node temp = head;
            while (temp.next != current) {
                temp = temp.next;
            }
            newNode.next = current;
            temp.next = newNode;
            current = newNode;
        }
    }

    public int getCurrent(){
        if(!isCurrent()){
            throw new IllegalStateException("No current element");
        }
        return current.data;
    }


    public static void main(String[] args){
        LinkedSeq obj = new LinkedSeq();
        obj.addAfter(10);    // Adding elements to the sequence
        obj.addAfter(20);
        obj.addAfter(30);
// Starting from the beginning of the sequence
        obj.start();
        while (obj.isCurrent()) {
            System.out.println(obj.getCurrent());    //Printing elements of the sequence
            obj.advance();
        }
        System.out.println("\nAdding 5 before the current element:");
        obj.start();
        obj.addBefore(5);


        obj.start();
        while (obj.isCurrent()) {
            System.out.println(obj.getCurrent());
            obj.advance();
        }
        System.out.println("Adding 25 after the current element:");
        obj.start();
        obj.advance();
        obj.addAfter(25);

        obj.start();
        while (obj.isCurrent()) {
            System.out.println(obj.getCurrent());    //Printing elements of the sequence
            obj.advance();
        }

        // remove current element
        System.out.println("Removing the current element");
        obj.start();
        obj.advance();
        obj.removeCurrent();


        obj.start();
        while (obj.isCurrent()) {
            System.out.println(obj.getCurrent());    //Printing elements of the sequence
            obj.advance();
        }
    }
}
