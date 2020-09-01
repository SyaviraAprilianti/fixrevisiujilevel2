const pesanan = $("#pesanan")
var task = 0
var harga = 0
var totalharga = 0
var invoice =[]

var menu = [
  ["Burger",25000,"assets/img/burger.jpg"],
  ["Steak", 89000,"assets/img/steak.jpg"],
  ["Spaghetti",20000,"assets/img/spaghetti.jpg"],
  ["Ramen",36000,"assets/img/ramen.jpg"],
  ["Kentang", 15000,"assets/img/kentang.jpg"],
  ["Pizza",52000,"assets/img/pizza.jpg"],
  ["Ice Drink",15000,"assets/img/ice drink.jpg"],
  ["Ice Bland", 21000,"assets/img/ice bland.jpg"],
  ["Flavoured Soda",22000,"assets/img/flavoured soda.jpg"],
  ["Milk Shake",22000,"assets/img/milk shake.jpg"],
  ["Milk Tea", 18000,"assets/img/milk tea.jpg"],
  ["Smoothie",20000,"assets/img/smoothie.jpg"],
]

// menubar
menu.forEach(data => {
  const menunyaa = `
  <div class="col-lg-2 mb-1 mt-1" onclick="MenuClick('${data[0]}',${data[1]},'${data[2]}')">
  <div class="card">
  <img src="${data[2]}" class="card-img-top">
  <div class="card-body p-2 text-center">
  <h6 class="card-title">${data[0]}</h6>
  <p class="card-text text-primary" >Rp ${noRupiah(data[1])}</p>
  </div>
  </div>    
  </div>
  `
  $("#menutampil").append(menunyaa)
})

function MenuClick(name, price, image) {
  for (var i = 0; i < invoice.length; i++) {
    if (name == invoice[i][0]) {
      invoice[i][3] += 1
      invoice_tampilan()
      return
    }
  }
  var dataMasuk = [name, price, image, 1]
  invoice.push(dataMasuk)
  invoice_tampilan()
}
// sidebar
function invoice_tampilan() {
  var harga = 0
  var pajak = 0
  $("#pesanan").html("")
  invoice.forEach(data => {
    const mengikat_item = `
    <div class="card p-1 mt-2" id="menu-1">
    <div class="row">
    <div class="col-lg-10">
    <h6>${data[0]}</h6>
    <p class="float-right position-absolute" style="right: 10px;top: 0px;"><b>Rp.${noRupiah(data[1])}</b></p> 
    <div class="row">
    <div class="col-lg-6">
    <p>Unit Price : <br><b>Rp.${noRupiah(data[1] * (data[3]))}</b></p> 
    </div>
    <div class="col-lg-6">
    <p>x${data[3]}</p> 
    </div>
    </div>
    </div>
    <div class="col-lg-2">
    <button type="button" class="btn btn-danger btn-hapus hapuspesanan"><img src="assets/img/sampah.png" width="20"></button>
    </div>
    </div>
    </div>
    `
    $('#pesanan').append(mengikat_item)
    harga += data[1] * data[3]
  })

  pajak =  harga * 10/100
  harga_total = harga + pajak

  $('#harga').text('Rp.' + noRupiah(harga));
  $('#task').text('Rp' +  noRupiah(pajak));
  $('#totalharga').text('Rp'+ noRupiah(harga_total))
}

$("#pesanan").on('click', '.hapuspesanan', function (e) {
  var position = $('.hapuspesanan').index(this)
  invoice.splice(position, 1)
  invoice_tampilan()
});

$('#pembayaran').keyup(function () {
  var kembalian = $('#pembayaran').val() - harga_total;
  $("#kembalian").val('Rp.'+ noRupiah(kembalian));
});

// $("#hapussemua").on('click', '.delete',function(e){
//   $("#pesanan > .card").remove();
// });


$("#hapussemua").on('click', function (e) {
  var posi = $('.delete').index(this)
  invoice.splice(posi, )
  invoice_tampilan()
});

function noRupiah(value) {
  value = value.toString();
  value = value.split(/(?=(?:...)*$)/);
  value = value.join('.');
  return value;
}