const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
//esse asterisco serve para pegar qualquer elemento que tenha o atributo 'tecla'

let novoNumero = true;
let operador;
let numeroAnterior;

 
 const operacaoPendente = () => operador != undefined;

 const calcular = () => {
    if(operacaoPendente()){
       const numeroAtual = parseFloat(display.textContent.replace(',','.'));
          novoNumero = true;
      const resultado = eval (`${numeroAnterior} ${operador} ${numeroAtual}`);
          atualizarDisplay(resultado);

   }
 }
 const atualizarDisplay = (texto) => {
    if(novoNumero){ 
        display.textContent = texto.toLocaleString('BR'); 
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
    
 }
 
 const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

 numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

 const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
        
    }
 }
 operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

 const ativarIgual = () => {
    calcular();
    operador = undefined;
 }
 document.getElementById('igual').addEventListener('click', ativarIgual);

 const limparDisplay = () => display.textContent = '';
 document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

 const limparCalculo = () => {
     limparDisplay();
     operador = undefined;
     novoNumero = true;
     numeroAnterior = undefined;   
 }
 document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

 const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
 document.getElementByid('backspace').addEventListener('click', removerUltimoNumero);

 const inverterSinal = () => {
   novoNumero = true;
   atualizarDisplay (display.textContent * -1);
 } 
 document.getElementById('inverter').addEventListener('click', inverterSinal);

 const existeDecimal = () => display.textContent.indexOf(',') != -1;
 const existeValor = () => display.textContent.length > 0;
 const inserirDecimal = () => {
   if (!existeDecimal()){
      if(existeValor()){
         atualizarDisplay(',');

      }else{
         atualizarDisplay('0,');
      }
   }
 }
 document.getElementById('decimal').addEventListener('click', inserirDecimal);
 
 const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
 }
const mapearTeclado = (evento) =>{
   const tecla = evento.key;
   
   document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);


//o metodo "forEach" ele varre todos os elementos de array
// o metodo 'forEach', é um laço de repetição usado para acessar um elemento de cada vez contido no array