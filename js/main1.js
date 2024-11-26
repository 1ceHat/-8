function change_validate_class(elem, flag, msg){
    let span = document.createElement("span")
    span.innerText = msg;
    span.className = "err_msg";

    /* console.log(span) */

    if (flag){
        if (elem.classList.contains("npassed_validate")){
            elem.classList.remove("npassed_validate")
            if (elem.hasChildNodes(span)){
                elem.removeChild(elem.getElementsByClassName("err_msg")[0])
            }
        }
        elem.classList.add("passed_validate");
    }
    else{
        if (elem.classList.contains("passed_validate")) { // символы
            elem.classList.remove("passed_validate")
        }
        if (!elem.getElementsByClassName("err_msg")[0]) {
            elem.appendChild(span)
        }
        elem.classList.add("npassed_validate");
    }
}

function my_validate(event){
    let item, item_name;
    if (event.type === "change"){
        //ChangeEvent.
        item_name = event.target.name; // получили, от кого вызвался ивент
        item = document.getElementById("order").getElementsByTagName("input");
        item = item.namedItem(item_name);
    }
    else{
        item = event;
        item_name = event.name;
    }
    let regex, error_message;
    switch (item_name){
        case "name" : {
            regex = /^[a-zA-Zа-яА-Я\s]{2,40}$/;
            error_message = "Проверьте, что имя написано буквами и не превышает 15 символов";
            break;
        }
        case "surname": {
            regex = /^[a-zA-Zа-яА-Я\s]{2,40}$/;
            error_message = "Проверьте, что имя написано буквами и не превышает 15 символов";
            break;
        }
        case "tel" : {
            regex = /^[0-9]{11,50}$/;
            error_message = "Проверьте, что введено не меньше 11 цифр";
            break;
        }
        case "address" : {
            regex = /^[a-zA-Zа-яА-Я0-9- .]{2,}, [a-zA-Zа-яА-Я0-9- .]{2,}, [a-zA-Zа-яА-Я0-9- .]{2,}, [0-9]{6}$/;
            error_message = "Проверьте, чтобы адрес был указан в формате:\n'ул. Пушкина, д. Колотушкина, кв. 69, 644007'"
            break;
        }
        case "email" : {
            regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
            error_message = "Проверьте, чтобы Email был указан в формате:\nArtem.Dudorov@urfu.me"
            break;
        }
        case "data" : {
            error_message = "Проверьте заполнение";
            break
        }
        case "time" : {
            error_message = "Проверьте заполнение";
            break
        }
        default: regex = null;
    }
    /*console.log(error_message)*/

    if (item_name !== "date" && item_name !== "time") {
        if (regex.test(item.value)) {
            change_validate_class(item.parentElement, true, error_message);
            return true;
        }
        else {
            change_validate_class(item.parentElement, false, error_message)
            return false;
        }
    }
    else{
        if (item.value) {
            change_validate_class(item.parentElement, true, error_message);
            return true;
        }
        else {
            change_validate_class(item.parentElement, false);
            return false;
        }
    }
}

function final_check(){
    let div_inputs = document.getElementById("order").getElementsByTagName("input");
    let div_form_data = document.getElementById("form_data");
    div_form_data.children = new HTMLCollection();
    let values = new Array(div_inputs.length)
    for (let i = 0; i < div_inputs.length; i++){
        let inn_html = '<p class="checked_data">';
        if (my_validate(div_inputs[i])) {
            inn_html += div_inputs[i].value + '</p>\n';
            div_form_data.innerHTML += inn_html;
        }

    }
}

let div_inputs = document.getElementById("order").children;
for (let i = 0; i < div_inputs.length; i++){
    let item = div_inputs.item(i);
    item.onchange = my_validate;
}

let button_submit = document.getElementById("form_order").getElementsByClassName("button")[0]
button_submit.onclick = final_check;

if (document.getElementById("form_data").children.length > 0){
    let top_slider = document.getElementById("form_order").getElementsByClassName("top-slide")[0]
    top_slider.classList.replace("top-slide", "top-slide-go")
    let bottom_slider = document.getElementById("form_order").getElementsByClassName("bottom-slide")[0]
    top_slider.classList.replace("bottom-slide", "bottom-slide-go")
}

