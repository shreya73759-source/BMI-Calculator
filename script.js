const bmiForm=document.getElementById("bmi-form");
const heightInput=document.getElementById("height");
const weightInput=document.getElementById("weight");
const result=document.getElementById("result");
const category=document.getElementById("category");
function calculateBMI(weight, height){
    const heightInMeters=height/100;
    const bmi=weight / (heightInMeters * heightInMeters);
    return bmi;
}
function getBMICategory(bmi){
    if (bmi<18.5){
        return "Underweight";
    }
    else if (bmi<25){
        return "Normal Weight";
    }
    else if (bmi<30){
        return "Overweight";
    }
    else{
        return "Obesity";
    }
}
function displayResult(bmi, bmiCategory){
    result.textContent="Your BMI is "+bmi.toFixed(2);
    category.textContent="Category: "+bmiCategory;
}
function showEmptyState(){
    result.textContent="Your BMI will appear here.";
    category.textContent="";
}
function saveResult(weight, height, bmi, bmiCategory){
    const bmiData={
        weight: weight,
        height: height,
        bmi: bmi,
        category: bmiCategory
    };
    localStorage.setItem("bmiResult", JSON.stringify(bmiData));
}
function loadResult(){
    const savedData=localStorage.getItem("bmiResult");
    if (savedData){
        const bmiData=JSON.parse(savedData);
        weightInput.value=bmiData.weight;
        heightInput.value=bmiData.height;
        displayResult(bmiData.bmi, bmiData.category);
    }
    else{
        showEmptyState();
    }
}
bmiForm.addEventListener("submit", function(event){
    event.preventDefault();
    const weight=Number(weightInput.value);
    const height=Number(heightInput.value);
    if (weight<=0 || height<=0){
        result.textContent="Please enter valid height and weight.";
        category.textContent="";
        return;
    }
    const bmi=calculateBMI(weight, height);
    const bmiCategory=getBMICategory(bmi);
    displayResult(bmi, bmiCategory);
    saveResult(weight, height, bmi, bmiCategory);
});
loadResult();