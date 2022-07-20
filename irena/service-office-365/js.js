$('.panel-title').on('click',function(){
	var show_value = $(this).parent().find('.panel-collapse');
	show_value.toggle('show');
});


let slider = document.getElementsByTagName("slider");
for (let i = 0; i < slider.length; i++) {
  // Guardar contenidos
  let contents = slider[i].innerHTML;
  // Numerar contenidos
  let NumContent=slider[i].getElementsByTagName("img").length;
  // Lista de intervalos
  let ListInter = [];
  // Crear elementos
  slider[i].innerHTML = '<div class="contents" id="content_slider_set_height" active="0">'+contents+'</div>';

  // Añadir flechas
  if (slider[i].getAttribute("arrows") == "true"){
    slider[i].innerHTML += '<div class="ArrowLeft" onclick="SliderLeft(this)"><p>❮</p></div>';
    slider[i].innerHTML += '<div class="ArrowRight" onclick="SliderRight(this)"><p>❯</p></div>';
  }
  // Añadir selectores
    if (slider[i].getAttribute("selec") == "true"){
    let selectores = "";
    for (let x = 0; x < NumContent; x++) {
      selectores += '<div onclick="SliderPosition(this, '+x+')" class></div>';
    }
    slider[i].innerHTML += '<div class="Selectores">'+selectores+'</div>';
    slider[i].querySelector("div.Selectores > div:nth-child(1)").className = "Activo";
  }
  // Añadir repuccion automatica
  let autoplayTime = parseInt(slider[i].getAttribute('autoplay'));
  if (autoplayTime > 0){
    // Crear intervalo inicial
    ListInter[i] = setInterval(function() {Next(i)}, autoplayTime*1000);
    // Evento sacar raton en el slider
    slider[i].onmouseleave = function() {
      ListInter[i] = setInterval(function() {Next(i)}, autoplayTime*1000);
    }
    // Evento meter raton en el slider
    slider[i].onmouseenter = function() {clearInterval(ListInter[i]);};
  }

  var win = $(this); //this = window
    var height_set = $('#image_default_size').height();
    
    $('#content_slider_set_height').height(height_set + 50);
}

$( document ).ready(function () {
  setTimeout(function(){
    var win = $(this); //this = window
    var height_set = $('#image_default_size').height();
    $('#content_slider_set_height').height(height_set + 50);
  },100);
})


// Anterior
function SliderLeft(Elements){
  // Guardar variables
  let Num = parseInt(Elements.parentNode.querySelector("div.contents").getAttribute("active"));
  let MaxNum = Elements.parentNode.getElementsByTagName("img").length-1;
  let Element = Elements.parentNode.getElementsByTagName("img");

  // Cambiar activo
  if(Num==0){Elements.parentNode.querySelector("div.contents").setAttribute('active', MaxNum);}
  else {Elements.parentNode.querySelector("div.contents").setAttribute('active', Num-1);}


  // Desplazar actual
  Element[Num].animate([
    {transform: 'translate(0%, 0)'}, {transform: 'translate(100%, 0)'}
  ], {duration: 250});
  Element[Num].style.transform="translateX(100%)";

  if(Num==0){
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[MaxNum].className = "Activo";
    }
    // Pasar a ultimo
    Element[MaxNum].animate([
      {transform: 'translate(-100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[MaxNum].style.transform="translateX(0%)";

  } else {
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[Num-1].className = "Activo";
    }
    // Pasar a anterior
    Element[Num-1].animate([
      {transform: 'translate(-100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[Num-1].style.transform="translateX(0%)";
  }
}


// Siguiente
function SliderRight(Elements){
  // Guardar variables
  let Num = parseInt(Elements.parentNode.querySelector("div.contents").getAttribute("active"));
  let MaxNum = Elements.parentNode.getElementsByTagName("img").length-1;
  let Element = Elements.parentNode.getElementsByTagName("img");

  // Cambiar activo
  if(Num==MaxNum){Elements.parentNode.querySelector("div.contents").setAttribute('active', 0);}
  else {Elements.parentNode.querySelector("div.contents").setAttribute('active', Num+1);}


  // Desplazar actual
  Element[Num].animate([
    {transform: ' translate(0%, 0)'}, {transform: 'translate(-100%, 0)'}
  ], {duration: 250});
  Element[Num].style.transform="translateX(-100%)";

  // Nuevo
  if(Num==MaxNum){
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[0].className = "Activo";
    }
    // Pasar a primero
    Element[0].animate([
      {transform: 'translate(100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[0].style.transform="translateX(0%)";
  } else {
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[Num+1].className = "Activo";
    }
    // Pasar a anterior
    Element[Num+1].animate([
      {transform: 'translate(100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[Num+1].style.transform="translateX(0%)";
  }
}


// Selector
function SliderPosition(Element, NewNum){
  // Guardar variables
  let Num=Element.parentNode.parentNode.querySelector("div.contents").getAttribute("active");

  // Cambiar activo
  Element.parentNode.parentNode.querySelector("div.contents").setAttribute('active', NewNum);

  // Quitar clase  y añadir nueva
  Element.parentNode.parentNode.getElementsByClassName("Activo")[0].className = "";
  Element.className = "Activo";

  // Guardar variable de ruta
  Element = Element.parentNode.parentNode.getElementsByTagName("img");

  if(Num>NewNum){
    // Sacar actual
    Element[Num].animate([
      {transform: ' translate(0%, 0)'}, {transform: 'translate(100%, 0)'}
    ], {duration: 250});
    Element[Num].style.transform="translateX(100%)";
    // Meter anterior
    Element[NewNum].animate([
      {transform: 'translate(-100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[NewNum].style.transform="translateX(0%)";
  }
  else if (Num<NewNum){
    // Sacar actual
    Element[Num].animate([
      {transform: ' translate(0%, 0)'}, {transform: 'translate(-100%, 0)'}
    ], {duration: 250});
    Element[Num].style.transform="translateX(-100%)";
    // Meter siguiente
    Element[NewNum].animate([
      {transform: 'translate(100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[NewNum].style.transform="translateX(0%)";
  }
}


// Autoplay
function Next(Position){
  // Guardar variables
  let Elements = document.getElementsByTagName("slider")[Position];
  let Num = parseInt(Elements.querySelector("div.contents").getAttribute("active"));
  let MaxNum = Elements.getElementsByTagName("img").length-1;
  let Element = Elements.getElementsByTagName("img");

  // Cambiar activo
  if(Num==MaxNum){Elements.querySelector("div.contents").setAttribute('active', 0);}
  else {Elements.querySelector("div.contents").setAttribute('active', Num+1);}

  // Desplazar actual
  Element[Num].animate([
    {transform: ' translate(0%, 0)'}, {transform: 'translate(-100%, 0)'}
  ], {duration: 250});
  Element[Num].style.transform="translateX(-100%)";

  // Nuevo
  if(Num==MaxNum){
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[0].className = "Activo";
    }
    // Pasar a primero
    Element[0].animate([
      {transform: 'translate(100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[0].style.transform="translateX(0%)";
  } else {
    // Cambiar la clase de selector
    if(Elements.parentNode.querySelector("div.Selectores > div")){
      Elements.parentNode.getElementsByClassName("Activo")[0].className = "";
      Elements.parentNode.querySelector("div.Selectores").getElementsByTagName("div")[Num+1].className = "Activo";
    }
    // Pasar a anterior
    Element[Num+1].animate([
      {transform: 'translate(100%, 0)'}, {transform: 'translate(0%, 0)'}
    ], {duration: 250});
    Element[Num+1].style.transform="translateX(0%)";
  }
}

$(window).on('resize', function(){
    var win = $(this); //this = window
    var height_set = $('#image_default_size').height();
    $('#content_slider_set_height').height(height_set + 50);
});

$( document ).ready(function () {
  var mode = Cookies.get('jss_selected');
  if (mode) {
    if (mode == "notech-dark") {
      const tag_mode = $(".microsorf-text-dark-screen");
      const tag_mode_light = $(".microsorf-text-light-screen");
      tag_mode[0].style.setProperty('display', 'block', 'important');
      tag_mode_light[0].style.setProperty('display', 'none', 'important');
    }
  }
});