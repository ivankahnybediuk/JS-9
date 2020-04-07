
let showModalWindow = function(state){
    document.getElementById('modal_window').style.display='block';
    document.getElementById('filter').style.display='block';
};
let closeModalWindow = function(state){
    document.getElementById('modal_window').style.display="none";
    document.getElementById('filter').style.display="none";
};

// Создать HTML-страницу для отображения/редактирования текста. При открытии страницы текст отображается с помощью тега div. При нажатии Ctrl + E, вместо div появляется textarea с тем же текстом, который теперь можно редактировать. При нажатии Ctrl + , вместо textarea появляется div с уже измененным текстом. Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.
let showTextArea = function(event){
    event.preventDefault();
    let div_text = document.getElementById('text-div');
    let text = div_text.innerText;
    if (event.ctrlKey && event.keyCode===69){
        div_text.innerHTML=`<textarea id="textarea_" cols="50" rows="20">${text}</textarea>`;
        let textArea=document.getElementById('textarea_');
        let textFromArea = textArea.value;
        textArea.oninput = function() {
        textFromArea = this.value};
     let closeTextArea=function(event2){
        if(event2.ctrlKey && event2.keyCode===107){
           div_text.innerText=`${textFromArea}`
    }
    };
    document.body.addEventListener("keydown", closeTextArea);
    document.getElementById("text-div").onkeydown = closeTextArea;
};
};

document.body.addEventListener("keydown", showTextArea);
document.getElementById("text-div").onkeydown = showTextArea;


// Создать HTML-страницу с большой таблицей. При клике по заголовку колонки, необходимо отсортировать данные по этой колонке. Учтите, что числовые значения должны сортироваться как числа, а не как строки.
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    
});

// Создать HTML-страницу с блоком текста в рамочке. Реализовать возможность изменять размер блока, если зажать мышку в правом нижнем углу и тянуть ее дальше.
let ie = 0;
let op = 0;
let ff = 0;
let block; 
let block_r; 
let delta_w = 0; 
let delta_h = 0; 
  
  onload = function () {
    
    let browser = navigator.userAgent;
    if (browser.indexOf("Opera") != -1) op = 1;
    else {
      if (browser.indexOf("MSIE") != -1) ie = 1;
      else {
        if (browser.indexOf("Firefox") != -1) ff = 1;
      }
    }
    block = document.getElementById("block"); 
    block_r = document.getElementById("block_resize"); 
    document.onmouseup = clearXY; 
    block_r.onmousedown = saveWH; 
  }

  function getXY(obj_event) {
    if (obj_event) {
      x = obj_event.pageX;
      y = obj_event.pageY;
    }
    else {
      x = window.event.clientX;
      y = window.event.clientY;
      if (ie) {
        y -= 2;
        x -= 2;
      }
    }
    return new Array(x, y);
  }
  function saveWH(obj_event) {
    var point = getXY(obj_event);
    w_block = block.clientWidth;
    h_block = block.clientHeight; 
    delta_w = w_block - point[0]; 
    delta_h = h_block - point[1]; 
    document.onmousemove = resizeBlock;
    if (op || ff) document.addEventListener("onmousemove", resizeBlock, false);
    return false; 
  }

  function clientWidth() {
    return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
  }
  
  function clientHeight() {
    return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  
  function clearXY() {
    document.onmousemove = null;
  }
  function resizeBlock(obj_event) {
    var point = getXY(obj_event);
    new_w = delta_w + point[0]; 
    new_h = delta_h + point[1]; 
    block.style.width = new_w + "px"; 
    block.style.height = new_h + "px"; 
    if (block.offsetLeft + block.clientWidth > clientWidth()) block.style.width = (clientWidth() - block.offsetLeft)  + "px";
    if (block.offsetTop + block.clientHeight > clientHeight()) block.style.height = (clientHeight() - block.offsetTop) + "px";
  }