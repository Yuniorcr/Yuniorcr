let n1=0,n2=0, n3=0, n4=0 , n5=0, n6=0, n7=0, n8=0, n9=0;
let totalT = 0;
subTotal = document.getElementById('subTotal');
total = document.getElementById('total');
group1 = document.getElementsByName('inlineRadioOptions');
group2 = document.getElementsByName('inlineRadioOptions1');
group3 = document.getElementsByName('inlineRadioOptions2');
group4 = document.getElementsByName('inlineRadioOptions3');
group5 = document.getElementsByName('inlineRadioOptions4');
group6 = document.getElementsByName('inlineRadioOptions5');
group7 = document.getElementsByName('inlineRadioOptions6');
group8 = document.getElementsByName('inlineRadioOptions7');
group9 = document.getElementsByName('inlineRadioOptions8');

group1.forEach(e => {
    e.addEventListener('change', () =>{
        n1 = e.value
        subTotal.innerText = n1
    })
});
group2.forEach(e => {
    e.addEventListener('change', () =>{
        n2 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1)
    })
});
group3.forEach(e => {
    e.addEventListener('change', () =>{
        n3 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3)
    })
});
group4.forEach(e => {
    e.addEventListener('change', () =>{
        n4 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4)
    })
});
group5.forEach(e => {
    e.addEventListener('change', () =>{
        n5 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5)
    })
});
group6.forEach(e => {
    e.addEventListener('change', () =>{
        n6 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6)
    })
});
group7.forEach(e => {
    e.addEventListener('change', () =>{
        n7 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7)
    })
});
group8.forEach(e => {
    e.addEventListener('change', () =>{
        n8 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7) + parseInt(n8)
    })
});
group9.forEach(e => {
    e.addEventListener('change', () =>{
        n9 = e.value
        totalT = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7) + parseInt(n8) + parseInt(n9)
        subTotal.innerText = totalT
        total.innerText = totalT
        calificar(totalT)
    })
});

function calificar(){
    console.log('calificar')
}