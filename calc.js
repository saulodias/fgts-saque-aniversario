

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
const maskedValue = (value) => $(".money").masked(String(Math.round(value*100)).padStart(3,0).padEnd(3,0));

const calc = (id) => {
  const unmaskedSaldo = unmaskedValue("#saldo"+id);
  const { saqueValor } = valorSaqueConta(unmaskedSaldo);
  $("#saldo"+id).val(maskedValue(unmaskedSaldo));
  const maskedSaque = maskedValue(saqueValor);
  $("#saque"+id).val(maskedSaque);

  const saldos = Array.from($(".saldo")).map(saldo => unmaskedValue("#" + saldo.id));
  const saques = Array.from($(".saque")).map(saque => unmaskedValue("#" + saque.id));

  const saldoTotal = saldos.reduce((a, b) => a + b, 0);
  const saqueTotal = saques.reduce((a, b) => a + b, 0);
  $("#saldoTotal").val(maskedValue(saldoTotal));
  $("#saqueTotal").val(maskedValue(saqueTotal));

  if(saldos[saldos.length - 1]) {
    adicionarLinha(saldos.length + 1);
  }
};

const adicionarLinha = (id) => {
  $('form').append(`
    <div class="row">
    <div class="col-2">Conta ${id}</div>
    <div class="col">
      <input
        id="saldo${id}"
        pattern="[0-9]*" inputmode="numeric"
        class="form-control form-control-sm money saldo"
        placeholder="Saldo"
        aria-label="saldo"
      />
    </div>
    <div class="col">
      <input
        id="saque${id}"
        pattern="[0-9]*" inputmode="numeric"
        value="0,00"
        class="form-control form-control-sm money saque"
        placeholder="Saque"
        aria-label="saque"
        disabled
      />
    </div>
    </div>`);
  $("#saldo"+id).mask("#.##0,00", { reverse: true });
  $("#saque"+id).mask("#.##0,00", { reverse: true });
  $("#saldo"+id).change(function(){
      calc(id);  
  });
}


$(document).ready(function () {
  adicionarLinha(1);
});
