

const faixa = (saldo) => {
  const faixas = [
      { max: 500, aliquota: 50, adicional: 0, },
      { max: 1000, aliquota: 40, adicional: 50, },
      { max: 5000, aliquota: 30, adicional: 150, },
      { max: 10000, aliquota: 20, adicional: 650, },
      { max: 15000, aliquota: 15, adicional: 1150, },
      { max: 20000, aliquota: 10, adicional: 1900, },
      { max: Infinity, aliquota: 5, adicional: 2900, }
    ];
  return faixas.find((f) => saldo <= f.max);
};

const valorSaqueConta = (saldo) => {
  const { aliquota, adicional } = faixa(saldo);
  const aliquotaValor = (saldo * aliquota) / 100;
  const saqueValor = aliquotaValor + adicional;
  return { saqueValor, aliquotaValor, adicional, saldo, aliquota };
};

const normalize = (value) => value.length < 3 

const unmaskedValue = (id) => $(id).cleanVal()/100;
const maskedValue = (value) => $('.money').masked(String(Math.round(value*100)).padStart(3,0).padEnd(3,0));

const calc = (id) => {
  const unmaskedSaldo = unmaskedValue('#saldo'+id);
  const { saqueValor } = valorSaqueConta(unmaskedSaldo);
  const maskedSaque = maskedValue(saqueValor);
  $("#saque"+id).val(maskedSaque);

  const saldoTotal = unmaskedValue('#saldo1') + unmaskedValue('#saldo2') + unmaskedValue('#saldo3') + unmaskedValue('#saldo4') + unmaskedValue('#saldo5');
  const saqueTotal = unmaskedValue('#saque1') + unmaskedValue('#saque2') + unmaskedValue('#saque3') + unmaskedValue('#saque4') + unmaskedValue('#saque5');

  $("#saldoTotal").val(maskedValue(saldoTotal));
  $("#saqueTotal").val(maskedValue(saqueTotal));
};


$(document).ready(function () {
    $(".money").mask("#.##0,00", { reverse: true });
    $(".percent").mask("##0,00%", { reverse: true });
  

    $(".money").change(function(event){
        const id = event.currentTarget.id[5];
        calc(id);
    });
});
