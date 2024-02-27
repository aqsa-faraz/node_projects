import inquirer from "inquirer";
export class Student{

    private firstName!: string;
    private lastName!: string;
    private gradeYear!: number;
    private studentID!: string;
    private courses: string = "";
    private tuitionBalance: number = 0;
    private static costOfCourse: number = 600;
    private static id: number = 1000;
    private maxNumOfCoursesAllowed: number = 5;
    //constructor : prompt user to enter student's name and year
    constructor(fname: string, lastname: string, gradeyear: number){
   
        this.firstName = fname;
        this.lastName = lastname;
        this.gradeYear = gradeyear; 
    
        this.setStudentID();

       
    }

    // Generate an ID
    private setStudentID(){
        // Grade level + id
        Student.id++;
        this.studentID = this.gradeYear+""+Student.id;
    }

    // Enroll in courses
    async enroll(){
        do{
            let course_enrolled = await inquirer.prompt({
                type: "input",
                name: "course",
                message: "Enter course to enroll (Q to quit): "
            });
            let course = course_enrolled.course;
            if(course!= "Q"){
                this.maxNumOfCoursesAllowed--;
                this.courses = this.courses + "\n " +course;
                this.tuitionBalance = this.tuitionBalance+Student.costOfCourse;
            }else{
                break;
            }
        }while(this.maxNumOfCoursesAllowed>0);

    }

    // View balance
    viewBalance(){
        console.log(`Your balance is: ${this.tuitionBalance}`);
    }

    // Pay tuition
    async payTuition(){
        // ask payment from the user
        this.viewBalance();
        let payment = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter your payment: $"
        });
        
        this.tuitionBalance = this.tuitionBalance - payment.amount;
        console.log(`Thank you for your payment of $${payment.amount}`);
        this.viewBalance();
    }

    // Show status
    showInfo():string{
        return `StudentID: ${this.studentID}\nName: ${this.firstName} ${this.lastName}\nGrade Level: ${this.gradeYear}\nCourses Enrolled: ${this.courses}\nBalance: ${this.tuitionBalance}`;
    }

}