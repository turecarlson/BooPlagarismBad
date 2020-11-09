public class testJava {
    public static int add(int num1, int num2) {
        int sum;
        sum = num1 + num2;
        return sum;
    }

    public static void main(String args[]) {
        int one = 1;
        int two = 2;

        int three = add(one, two);
        System.out.println(three);
    }
}