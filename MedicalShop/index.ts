let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserId: string;
let CurrentUserEmail: string;
let CurrentUserMdicineName: string;
let CurrentUserMdicineId: string;
let CurrentOrderId: string;
let CurrentUserBalance: number;

let NewUserEmailStatus = false;
let NewUserPasswordStatus = false;
let NewUserPhoneNumberStatus = false;


//user class
class User {

    UserId: string;
    UserEmail: string;
    Password: string;
    CPassword: string;
    UserPhoneNumber: number;
    Balance: number;

    constructor(paramUserEmail: string, paramUserPassword: string, paramUserCPassword: string, paramUserPhoneNumber: number, balance: number) {

        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserEmail = paramUserEmail;
        this.Password = paramUserPassword;
        this.CPassword = paramUserCPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.Balance = balance;
    }

}

//MedicineInfo
class MedicineInfo {

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    ExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, paraExpiryDate: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.ExpiryDate = paraExpiryDate;
    }

}

//Order
enum OrderStatus {
    Cancelled = "Canceled",
    Ordered = "Ordered"
}
class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;

    MedicineName: string;
    MedicineCount: number;
    OrderStatus: OrderStatus;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, orderStatus: OrderStatus) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;

        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatus = orderStatus;
    }
}

//user list
let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("devi@gmail.com", "devi", "devi", 9789011226, 100));
UserArrayList.push(new User("nila@gmail.com", "nila", "nila", 9789011228, 1000));

//MedicineList
let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2027, 4, 23)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2022, 4, 23)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 4, 23)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2025, 4, 23)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2026, 4, 23)));

//OrderList
let OrderList: Array<Order> = new Array<Order>();

OrderList.push(new Order("MID101", "UI1001", "Paracetomol", 3, OrderStatus.Ordered));
OrderList.push(new Order("MID102", "UI1001", "Stepsil", 2, OrderStatus.Ordered));


//signup page
function signUp() {

    if (NewUserEmailStatus == true &&
        NewUserPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {
        let newUserEmail = (document.getElementById('email') as HTMLInputElement).value;
        let newUserpass = (document.getElementById('pass') as HTMLInputElement).value;
        let newUserCpass = (document.getElementById('pass2') as HTMLInputElement).value;
        let newUserPhoneNumber = (document.getElementById('phone') as HTMLInputElement).value;



        UserArrayList.push(new User(newUserEmail, newUserpass, newUserCpass, +newUserPhoneNumber, 0));

        displayHomePage();
    }
    else {
        alert("Please fill out the form fully.")
    }
}

//existing page
function existingUserPage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
 
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let availableUser = document.getElementById('availableUser') as HTMLLabelElement;

    homePage.style.display = "none";
   
    existingUserPage.style.display = "block";

    availableUser.innerHTML = "<h2>Available User</h2>";


    for (let i = 0; i < UserArrayList.length; i++) {

        availableUser.innerHTML += `User Email : ${UserArrayList[i].UserEmail} | User Id : ${UserArrayList[i].UserId}<br>`;
    }
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "none";

}

//sign in page
function signIn() {

    let noExistingUserIdChecker: boolean = false;
    let existingUserId = (document.getElementById('existingUserId') as HTMLInputElement).value;

    let existingUserIdRegex = /^UI\d{4}$/;

    if (existingUserIdRegex.test(existingUserId)) {

        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].UserId == existingUserId) {

                CurrentUserId = UserArrayList[i].UserId;
                CurrentUserEmail = UserArrayList[i].UserEmail;
                CurrentUserBalance = UserArrayList[i].Balance;

                medicinePage();


                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }

        if (noExistingUserIdChecker) {
            alert("Enter Valid User Id");
        }
    }
    else {
        alert("Enter Valid User Id.");
    }

}

//medicinePage page
function medicinePage() {

    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    medicinePage.style.display = "block";


    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "none";

    let tableDisplay = document.getElementById('medicineDiv') as HTMLDivElement;
    tableDisplay.style.display = "none";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let cancelDisplay = document.getElementById('cancelDisplay') as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let topupDiv = document.getElementById("topupDiv") as HTMLDivElement;
    topupDiv.style.display = "none";

    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.innerHTML = "Welcome";
}
//display medicine
function DisplayMedicine() {
    const tableBody = document.querySelector("#medicineInfo tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.MedicineName}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.MedicinePrice}</td>
        <td>${item.ExpiryDate.toLocaleDateString()}</td>
        <td>
            <button onClick="MedicineEdit('${item.MedicineId}')">Edit</button> 
            <button onClick="MedicineDelete('${item.MedicineId}')">Delete</button>  
        </td>
         
      `;
        tableBody.appendChild(row);
    });
    let tableDisplay = document.getElementById('medicineInfo') as HTMLDivElement;
    tableDisplay.style.display = "block";
    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "block";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let cancelDisplay = document.getElementById('cancelDisplay') as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let topupDiv = document.getElementById("topupDiv") as HTMLDivElement;
    topupDiv.style.display = "none";

    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";

}

//Medicine Delete
function MedicineDelete(item: string) {
    MedicineList = MedicineList.filter((items) => items.MedicineId !== item);
    DisplayMedicine();
}

//edit medicine
let emedname = document.getElementById("medname") as HTMLInputElement;
let emedcount = document.getElementById("medcount") as HTMLInputElement;
let emedprice = document.getElementById("medprice") as HTMLInputElement;
let emeddate = document.getElementById("meddate") as HTMLInputElement;
let currentMedicineId: string | null;
function MedicineEdit(items: string) {
    let AddDiv = document.getElementById("AddDiv") as HTMLDivElement;
    AddDiv.style.display = "block";

    const item = MedicineList.find((item) => item.MedicineId === items);
    if (item) {
        currentMedicineId = item.MedicineId;
        emedname.value = item.MedicineName;
        emedcount.value = String(item.MedicineCount);
        emedprice.value = String(item.MedicinePrice);
        emeddate.value = String(item.ExpiryDate);

    }

}

//add medicine
let medname: string;
let medcount: number;
let medprice: number;
let meddate: Date;
function Add() {
    let AddDiv = document.getElementById("AddDiv") as HTMLDivElement;
    AddDiv.style.display = "block";


}
function addPush() {
    medname = (document.getElementById("medname") as HTMLInputElement).value;
    medcount = parseInt((document.getElementById("medcount") as HTMLInputElement).value);
    medprice = parseInt((document.getElementById("medprice") as HTMLInputElement).value);
    meddate = new Date((document.getElementById("meddate") as HTMLInputElement).value);
    if (currentMedicineId == null) {
        MedicineList.push(new MedicineInfo(medname, medcount, medprice, meddate));
        DisplayMedicine();
    } else {
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].MedicineId == currentMedicineId) {
                MedicineList[i].MedicineName = medname;
                MedicineList[i].MedicineCount = medcount;
                MedicineList[i].MedicinePrice = medprice;
                MedicineList[i].ExpiryDate = MedicineList[i].ExpiryDate;
                DisplayMedicine();
            }
        }
    }

    let AddDiv = document.getElementById("AddDiv") as HTMLDivElement;
    AddDiv.style.display = "none";
}
//purchase
function Purchase() {
    const tableBody = document.querySelector("#puchaseMedicine tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    MedicineList.forEach((item) => {

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.MedicineName}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.MedicinePrice}</td>
        <td>${item.ExpiryDate.toLocaleDateString()}</td>
        <td>
          <button onclick="BuyMedicine('${item.MedicineId}')"  >Buy</button>          
        </td> 
      `;
        tableBody.appendChild(row);
    });


    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "block";

    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "none";

    let cancelDisplay = document.getElementById('cancelDisplay') as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let topupDiv = document.getElementById("topupDiv") as HTMLDivElement;
    topupDiv.style.display = "none";

    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";
}
//cancel
function Cancel() {
    const tableBody = document.querySelector("#cancelDisplay tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    OrderList.forEach((item) => {
        if (item.UserId == CurrentUserId && item.OrderStatus == OrderStatus.Ordered) {
            CurrentOrderId = item.OrderId;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.UserId}</td>
                <td>${item.MedicineId}</td>
                <td>${item.MedicineCount}</td>
                <td>${item.MedicineName}</td>
                <td>${item.OrderStatus}</td> 
                <td>
                   <button onClick="Remove()">Cancel</button>
                </td>
            `;
            tableBody.appendChild(row);
        }


    });


    let cancelDisplay = document.getElementById("cancelDisplay") as HTMLTableElement;
    cancelDisplay.style.display = "block";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let topupDiv = document.getElementById("topupDiv") as HTMLDivElement;
    topupDiv.style.display = "none";

    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";
}
function Remove() {
    OrderList.forEach((item) => {
        if (item.OrderId == CurrentOrderId) {
            item.OrderStatus = OrderStatus.Cancelled;
            MedicineList.forEach((items) => {
                if (items.MedicineId == item.MedicineId) {
                    items.MedicineCount += item.MedicineCount;
                }
            })
        }
    })
    Cancel();
}

let selectedID: string;
//BuyMedicine
function BuyMedicine(item: string) {

    let puchaseMedicine = document.getElementById("puchaseMedicine") as HTMLTableElement;
    puchaseMedicine.style.display = "none";
    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "block";
    selectedID = item;
};


//top up
function TopUp() {
    let divelement = document.getElementById("topupDiv") as HTMLDivElement;
    divelement.style.display = "block";
    let currentAmount = document.getElementById("currentAmount") as HTMLElement;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            currentAmount.innerHTML = UserArrayList[i].Balance.toString();
        }
    }

    let cancelDisplay = document.getElementById("cancelDisplay") as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";


    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";

    let afterdivelement = document.getElementById("afterTopupDiv") as HTMLDivElement;
    afterdivelement.style.display = "none";

}
function Recharge() {
    let afterdivelement = document.getElementById("afterTopupDiv") as HTMLDivElement;
    let inpuTtopup = document.getElementById("inpuTtopup") as HTMLInputElement;
    let afterTopup = document.getElementById("afterTopup") as HTMLSpanElement;
    afterdivelement.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            UserArrayList[i].Balance += parseInt(inpuTtopup.value);
            afterTopup.innerHTML = UserArrayList[i].Balance.toString();
            inpuTtopup.value = " ";
        }
    }
}
//show balance
function ShowBalance() {
    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    let cbalance = document.getElementById("cbalance") as HTMLSpanElement;
    ShowBalance.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {

            cbalance.innerHTML = UserArrayList[i].Balance.toString();
            CurrentUserBalance = UserArrayList[i].Balance;
        }
    }
    let divelement = document.getElementById("topupDiv") as HTMLDivElement;
    divelement.style.display = "none";

    let cancelDisplay = document.getElementById("cancelDisplay") as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "none";

    let historyDisplay = document.getElementById('historyDisplay') as HTMLTableElement;
    historyDisplay.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";

    let afterdivelement = document.getElementById("afterTopupDiv") as HTMLDivElement;
    afterdivelement.style.display = "none";
}
//buy medicine
function buyMedicine() {

    let proceed: boolean = true;
    let finalMedicineRequiredCount: number = 0;
    let medicineRequiredCount = (document.getElementById('medicineRequiredCount') as HTMLInputElement).value;
    let medicineRequiredCountFeild = (document.getElementById('medicineRequiredCount') as HTMLInputElement);
    let medicineRequiredCountRegex = /^\d{1,3}$/;

    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {

            if (MedicineList[i].MedicineId == selectedID) {


                if (MedicineList[i].MedicineCount > 0) {

                    if ((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0) {
                        proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`)

                        if (proceed) {
                            finalMedicineRequiredCount = MedicineList[i].MedicineCount;
                        }
                    }
                    else {
                        finalMedicineRequiredCount = +medicineRequiredCount;
                    }

                    if (proceed) {
                        if (finalMedicineRequiredCount* MedicineList[i].MedicinePrice > CurrentUserBalance) {
                            //medicineRequiredCountFeild.value = " ";
                            finalMedicineRequiredCount = 0;
                            alert("You have Insufficiet Balance. Please TopUp......  ");

                        } else {
                            MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;
                            OrderList.push(new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, finalMedicineRequiredCount, OrderStatus.Ordered));
                            for (let i = 0; i < UserArrayList.length; i++) {
                                if (CurrentUserId == UserArrayList[i].UserId) {
                                    UserArrayList[i].Balance = UserArrayList[i].Balance - finalMedicineRequiredCount* MedicineList[i].MedicinePrice;
                                    CurrentUserBalance = UserArrayList[i].Balance;
                                }
                            }
                            medicineRequiredCountFeild.value = " ";
                            alert("Purchase Success.");
                        }


                    }

                }
                else if (MedicineList[i].MedicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }

        }
    }
    else {
        alert("Please enter valid Required Count");
    }

    Purchase();
}

//show history
function showHistory() {
    let historyDisplay = document.getElementById('historyDisplay') as HTMLLabelElement;
    historyDisplay.style.display = "block";

    const historyDisplaytable = document.querySelector("#historyDisplay tbody") as HTMLTableSectionElement;
    historyDisplaytable.innerHTML = "";
    OrderList.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.MedicineId}</td>
        <td>${item.UserId}</td>
        <td>${item.MedicineName}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.OrderStatus}</td>
         
      `;
        historyDisplaytable.appendChild(row);
    });
    let divelement = document.getElementById("topupDiv") as HTMLDivElement;
    divelement.style.display = "none";

    let cancelDisplay = document.getElementById("cancelDisplay") as HTMLTableElement;
    cancelDisplay.style.display = "none";

    let purchasetableDisplay = document.getElementById('puchaseMedicine') as HTMLTableElement;
    purchasetableDisplay.style.display = "none";

    let medicineDiv = document.getElementById("medicineDiv") as HTMLDivElement;
    medicineDiv.style.display = "none";

    let ShowBalance = document.getElementById("ShowBalance") as HTMLDivElement;
    ShowBalance.style.display = "none";

    let requiredCount = document.getElementById("requiredCount") as HTMLDivElement;
    requiredCount.style.display = "none";

    let greet = document.getElementById('greet') as HTMLElement;
    greet.style.display = "none";

    let afterdivelement = document.getElementById("afterTopupDiv") as HTMLDivElement;
    afterdivelement.style.display = "none";
}

//email validation
function checkEmail(paraEmail: string) {
    let newUserEmail = (document.getElementById(paraEmail) as HTMLInputElement).value;
    let newUserEmailMessage = document.getElementById(paraEmail + "Message") as HTMLLabelElement;
    var regxemail = /^([a-z 0-9]+)@([a-z]+)\.([a-z]{2,20})$/;

    if (regxemail.test(newUserEmail) == true) {
        NewUserEmailStatus = true;
        newUserEmailMessage.style.visibility = "hidden";
    } else {
        NewUserEmailStatus = false;
        newUserEmailMessage.innerHTML = "Please enter valid email";
        newUserEmailMessage.style.visibility = "visible";
        newUserEmailMessage.style.color = "tomato";
        newUserEmailMessage.style.marginLeft = "10px";
    }
}

//password validate
function checkPassword(paraPass: string) {
    let newUserPass = (document.getElementById(paraPass) as HTMLInputElement).value;
    let newUserPassMessage = document.getElementById(paraPass + "Message") as HTMLLabelElement;
    let newUserPasserRegex = /^\w{5,7}$/;

    if (newUserPasserRegex.test(newUserPass)) {

        NewUserPasswordStatus = true;
        newUserPassMessage.style.visibility = "hidden";
    }
    else {
        NewUserPasswordStatus = false;
        newUserPassMessage.innerHTML = "Please enter valid password. password should have atleast 5 letter atmost 7 letter";
        newUserPassMessage.style.visibility = "visible";
        newUserPassMessage.style.color = "tomato";
        newUserPassMessage.style.marginLeft = "10px";
    }
}

//Confirm password validate
// function checkConfirmPassword(paraCPass: string,paraPss: string){
//     let newUserPass = (document.getElementById(paraPss) as HTMLInputElement).value;
//     let newUserCPass = (document.getElementById(paraCPass) as HTMLInputElement).value;
//     let newUserCPassMessage = document.getElementById(paraCPass + "Message") as HTMLLabelElement;


//     if (newUserPass!==newUserCPass  ) {

//         NewUserCPasswordStatus = true;
//         newUserCPassMessage.style.visibility = "hidden";
//     }
//     else {
//         NewUserCPasswordStatus = false;
//         newUserCPassMessage.innerHTML = "Please enter valid password ";
//         newUserCPassMessage.style.visibility = "visible";
//         newUserCPassMessage.style.color = "tomato";
//         newUserCPassMessage.style.marginLeft = "10px";
//     } 
// }
//validate phone number
function checkPhone(paramNewUserPhoneNumber: string) {
    let newUserPhoneNumber = (document.getElementById(paramNewUserPhoneNumber) as HTMLInputElement).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message") as HTMLLabelElement;
    let newUserPhoneNumberRegex = /^\d{10}$/;

    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {

        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }

}

//display method
function displayHomePage() {
    CurrentUserId = "";
    CurrentUserEmail = "";

    // let medicineList = document.getElementById('medicineList') as HTMLSelectElement;
    // medicineList.selectedIndex = 0;

    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    let historyDisplay = document.getElementById('historyDisplay') as HTMLLabelElement;

    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let homePage = document.getElementById('homePage') as HTMLDivElement;

    //(document.getElementById('medicineRequiredCount') as HTMLInputElement).value = null;
    //(document.getElementById('existingUserId') as HTMLInputElement).value = null;

    requiredCount.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    medicineInfo.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homePage.style.display = "block";
}

//new user page
function newUserPage() {

    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "block";
}
